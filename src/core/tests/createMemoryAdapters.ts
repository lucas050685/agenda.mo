import { MemoryGroupRepository } from "@adapters/memory/MemoryGroupRepository";
import { MemoryInvitationRepository } from "@adapters/memory/MemoryInvitationRepository";
import { MemoryPlaceRepository } from "@adapters/memory/MemoryPlaceRepository";
import { MemoryRendezvousRepository } from "@adapters/memory/MemoryRendezvousRepository";
import { MemoryRoleRepository } from "@adapters/memory/MemoryRoleRepository";
import { MemoryUserRepository } from "@adapters/memory/MemoryUserRepository";
import { User, Group, Role, Rendezvous } from "@core/types";

export function createMemoryAdapters(){
  const groupRepository = new MemoryGroupRepository();
  const userRepository = new MemoryUserRepository();
  const roleRepository = new MemoryRoleRepository();
  const rendezvousRepository = new MemoryRendezvousRepository();
  const invitationRepository = new MemoryInvitationRepository();
  const placeRepository = new MemoryPlaceRepository();

  const clear = () => {
    groupRepository.clear();
    userRepository.clear();
    roleRepository.clear();
    rendezvousRepository.clear();
    invitationRepository.clear();
    placeRepository.clear();
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

  return {
    groupRepository,
    userRepository,
    roleRepository,
    rendezvousRepository,
    invitationRepository,
    placeRepository,

    clear,
    pushMocks,
  };
}
