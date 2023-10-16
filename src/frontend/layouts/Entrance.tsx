import { Title } from "@/frontend/ui";
import { PropsWithChildren } from "react";

export function Entrance({ children }: PropsWithChildren): JSX.Element {
  return <div className="flex justify-stretch w-full h-screen">
  <div className="w-3/5 p-10 text-center text-white bg-primary flex flex-col justify-center">
    <Title.Center>Agenda.mo</Title.Center>
    <p>Sua plataforma para se manter conectado em tudo o tempo todo.</p>
  </div>

  <div className="w-2/5 py-10 px-40 flex flex-col justify-center items-center">
    {children}
  </div>
</div>;
}