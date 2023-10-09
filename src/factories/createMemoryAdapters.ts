import { 
  MemoryUserRepository,
  MemoryGroupRepository,
  MemoryRoleRepository,
} from '@/adapters/memory';
import { SystemPasswordAdapter, SystemTokenizerAdapter } from '@adapters/system';
import { EventEmitter } from 'events';

export function createMemoryAdapters() {
  const secret = process.env.SECRET ?? 'this app has no secret';

  return {
    userRepository: new MemoryUserRepository(),
    groupRepository: new MemoryGroupRepository(),
    roleRepository: new MemoryRoleRepository(),
    passwordAdapter: new SystemPasswordAdapter(),
    tokenizerAdapter: new SystemTokenizerAdapter(secret),
    eventBus: new EventEmitter()
  }
}
