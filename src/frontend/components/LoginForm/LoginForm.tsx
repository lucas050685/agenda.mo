import { InputBox, Button, Form, FormDataInputs } from '@/frontend/ui';

export function LoginForm(): JSX.Element {
  const handleSubmit = (data: FormDataInputs) => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
        alert(JSON.stringify(data, null, 2))
      }, 3000);
    });
  }

  return <Form className="flex flex-col align-center" formClassName="w-96" onSubmit={handleSubmit}>
    <InputBox label="Usuário" name="username" />
    <InputBox label="Senha" type="password" name="password" />
    <InputBox label="Mantenha-me conectado" type="checkbox" name="keep-connection" />
    <Button type="submit" label="Login" />
  </Form>;
}
