import { MemoryGroupRepository } from "@adapters/memory/MemoryGroupRepository";
import { MemoryInvitationRepository } from "@adapters/memory/MemoryInvitationRepository";
import { MemoryPlaceRepository } from "@adapters/memory/MemoryPlaceRepository";
import { MemoryRendezvousRepository } from "@adapters/memory/MemoryRendezvousRepository";
import { MemoryRoleRepository } from "@adapters/memory/MemoryRoleRepository";
import { MemoryUserRepository } from "@adapters/memory/MemoryUserRepository";
import { MemoryBusinessRepository } from "@adapters/memory/MemoryBusinessRepository";
import { User, Group, Role, Rendezvous, Business } from "@core/types";
import { address } from "./address.mock";
import { MemoryBusinessRoleRepository } from "@adapters/memory/MemoryBusinessRoleRepository";

export function createMemoryAdapters(){
  const groupRepository = new MemoryGroupRepository();
  const userRepository = new MemoryUserRepository();
  const roleRepository = new MemoryRoleRepository();
  const rendezvousRepository = new MemoryRendezvousRepository();
  const invitationRepository = new MemoryInvitationRepository();
  const placeRepository = new MemoryPlaceRepository();
  const businessRepository = new MemoryBusinessRepository();
  const businessRoleRepository = new MemoryBusinessRoleRepository();

  const clear = () => {
    groupRepository.clear();
    userRepository.clear();
    roleRepository.clear();
    rendezvousRepository.clear();
    invitationRepository.clear();
    placeRepository.clear();
    businessRepository.clear();
    businessRoleRepository.clear();
  };

  const pushMocks = async () => {
    const user: User = { email: 'johnny@agendamo.net' };
    const savedUser = await userRepository.save(user);
    const group: Group = { admin: savedUser.id, title: 'test-group' }
    const savedGroup = await groupRepository.save(group);
    const role: Role = {
      groupId: savedGroup.id,
      userIds: [savedUser.id],
      title: 'default',
      default: true,
    };
    const savedRole = await roleRepository.save(role);
    return {
      user: savedUser,
      group: savedGroup,
      role: savedRole,
    };
  };

  const pushMocksWithBusiness = async ()=>{
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
  }

  return {
    groupRepository,
    userRepository,
    roleRepository,
    rendezvousRepository,
    invitationRepository,
    placeRepository,
    businessRepository,
    businessRoleRepository,

    clear,
    pushMocks,
    pushMocksWithBusiness,
  };
}
