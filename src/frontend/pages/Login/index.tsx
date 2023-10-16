import { LoginForm } from '@/frontend/components';
import { Title, FooterLink, FooterLinkGroup } from '@/frontend/ui';
import { Entrance } from '@/frontend/layouts';

export function LoginPage(): JSX.Element {
  return (
    <Entrance>
      <Title.Center>Login</Title.Center>
      <LoginForm />
      <FooterLinkGroup>
        <FooterLink>Esqueci minha senha</FooterLink>
        <FooterLink to="/signup">Ainda não tenho uma conta</FooterLink>
      </FooterLinkGroup>
    </Entrance>
  );
}