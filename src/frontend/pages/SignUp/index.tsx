import { SignUpForm } from "@/frontend/components/SignUpForm"
import { Entrance } from "@/frontend/layouts"
import { FooterLink, FooterLinkGroup, Title } from "@/frontend/ui"

export function SignUpPage(): JSX.Element {
  return <Entrance>
    <Title.Center>Criar conta</Title.Center>
    <SignUpForm />
    <FooterLinkGroup>
      <FooterLink to="/">Já tenho uma conta</FooterLink>
    </FooterLinkGroup>
  </Entrance>
}
