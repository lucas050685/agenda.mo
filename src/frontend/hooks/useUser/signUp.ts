import { checkpoint } from '@/frontend/helpers';

export function singUp(userDraft: any){
  checkpoint(userDraft);
  return new Promise<void>(resolve => {
    setTimeout(()=>{
      resolve();
    }, 2000);
  });
}
