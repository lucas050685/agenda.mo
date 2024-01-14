import { ChangeEvent, useState } from 'react';
import { Button, Form, InputBox } from '@/frontend/ui';
import { checkpoint, emailValidator } from '@/frontend/helpers';
import { useUser } from '@/frontend/hooks/useUser';
import { User } from '@/core/types';

export function SignUpForm(): JSX.Element {
  const { signUp } = useUser();
  const [pass, setPass] = useState('');
  const [passConfirmation, setPassConfirmation] = useState('');
  const passError = pass != passConfirmation ? `Este campo deve ser idêntico a senha` : '';

  const handleSubmit = async (data: Record<string, any>) => {
    const response = await signUp(data as User);
    checkpoint(response);
    return;
  }

  const handleEmailValidation = (value: string) => {
    if (emailValidator(value)) return true;
    return `Insira um email válido`;
  }

  const handlePassChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPass(value);
  }

  const handlePasswordConfirmation = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setPassConfirmation(value);
  }

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col align-center" formClassName="w-96">
      <InputBox required label="Email" name="email" validator={handleEmailValidation} />
      <InputBox label="Nome" name="name" />
      <InputBox value={pass} onChange={handlePassChange} required label="Senha" name="password" type="password" />
      <InputBox value={passConfirmation} onChange={handlePasswordConfirmation} error={passError} label="Confirmar senha" name="cofirm-password" type="password" />
      <InputBox type="checkbox" label="Aceito os termos" checked />
      <Button type="submit">Criar conta</Button>
    </Form>
  );
}