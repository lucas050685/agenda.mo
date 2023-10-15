import { mock } from 'bun:test';
import { MemoryGroupRepository } from "@/adapters/memory/MemoryGroupRepository";
import { MemoryInvitationRepository } from "@/adapters/memory/MemoryInvitationRepository";
import { MemoryPlaceRepository } from "@/adapters/memory/MemoryPlaceRepository";
import { MemoryRendezvousRepository } from "@/adapters/memory/MemoryRendezvousRepository";
import { MemoryRoleRepository } from "@/adapters/memory/MemoryRoleRepository";
import { MemoryUserRepository } from "@/adapters/memory/MemoryUserRepository";
import { MemoryBusinessRepository } from "@/adapters/memory/MemoryBusinessRepository";
import { User, Group, Role, Business, Rendezvous, Invitation } from "@/core/types";
import { address } from "./address.mock";
import { MemoryBusinessRoleRepository } from "@/adapters/memory/MemoryBusinessRoleRepository";
import { createMockDates } from './createMockDates';
import { SystemPasswordAdapter, SystemTokenizerAdapter } from '@/adapters/system';

export function createMemoryAdapters(){
  const groupRepository = new MemoryGroupRepository();
  const userRepository = new MemoryUserRepository();
  const roleRepository = new MemoryRoleRepository();
  const rendezvousRepository = new MemoryRendezvousRepository();
  const invitationRepository = new MemoryInvitationRepository();
  const placeRepository = new MemoryPlaceRepository();
  const businessRepository = new MemoryBusinessRepository();
  const businessRoleRepository = new MemoryBusinessRoleRepository();
  const passwordAdapter = new SystemPasswordAdapter();
  const tokenizerAdapter = new SystemTokenizerAdapter('test');

  const eventBus = {
    emit: mock((eventName: any, body: any)=> undefined),
  };

  const clear = () => {
    groupRepository.clear();
    userRepository.clear();
    roleRepository.clear();
    rendezvousRepository.clear();
    invitationRepository.clear();
    placeRepository.clear();
    businessRepository.clear();
    businessRoleRepository.clear();
    eventBus.emit.mockReset();
  };

  const pushMocks = async () => {
    const userPassword = '123456';
    const [password, passwordDetails] = await passwordAdapter.hash(userPassword);
    const user: User = { email: 'mock_johnny@agendamo.net', password, passwordDetails };
    const savedUser = await userRepository.save(user);
    const group: Group = { admin: savedUser.id, title: 'mock-test-group' }
    const savedGroup = await groupRepository.save(group);
    const role: Role = {
      groupId: savedGroup.id,
      userIds: [savedUser.id],
      title: 'default',
      default: true,
    };
    const savedRole = await roleRepository.save(role);
    savedGroup.defaultRoleId = savedRole.id;
    return {
      userPassword,
      user: savedUser,
      group: savedGroup,
      role: savedRole,
    };
  };

  const pushMocksWithBusiness = async () => {
    const state = await pushMocks();
    const business: Business = {
      title: 'my business',
      description: 'my business description',
      admin: state.user.id,
      address,
      phoneNumbers: [],
      email: 'mybusiness@agendamo.net',
    }
    const savedBusiness = await businessRepository.save(business);
    return {
      ...state,
      business: savedBusiness,
    }
  };

  const pushMocksWithRendezvous = async () => {
    const state = await pushMocks();
    const { tomorrow } = createMockDates();
    const rendezvous: Rendezvous = {
      groupId: state.group.id,
      date: tomorrow.toISOString(),
      title: 'mock rendezvous',
    };
    const savedRendevous = await rendezvousRepository.save(rendezvous);
    const invitation: Invitation = {
      rendezvousId: savedRendevous.id,
      userId: state.user.id,
      state: "pending",
    }
    const savedInvitation = await invitationRepository.save(invitation);
    return {
      ...state,
      redezvous: savedRendevous,
      invitation: savedInvitation,
    }
  };

  return {
    groupRepository,
    userRepository,
    roleRepository,
    rendezvousRepository,
    invitationRepository,
    placeRepository,
    businessRepository,
    businessRoleRepository,
    passwordAdapter,
    tokenizerAdapter,
    eventBus,

    clear,
    pushMocks,
    pushMocksWithBusiness,
    pushMocksWithRendezvous,
  };
}
