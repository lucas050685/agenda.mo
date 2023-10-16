import { Button, Form, InputBox } from "@/frontend/ui";

export function SignUpForm(): JSX.Element {
  return (
    <Form className="flex flex-col align-center" formClassName="w-96">
      <InputBox label="Email" name="email" />
      <InputBox label="Nome" name="name" />
      <InputBox label="Senha" name="password" type="password" />
      <InputBox label="Confirmar senha" name="cofirm-password" type="password" />
      <InputBox type="checkbox" label="Aceito os termos" checked />
      <Button type="submit">Criar conta</Button>
    </Form>
  );
}