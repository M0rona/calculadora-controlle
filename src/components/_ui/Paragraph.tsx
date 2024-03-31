import { ReactNode } from "react";

export const Paragraph = ({ children }: { children: ReactNode }) => {
  return <p className="text-graphite mt-6 font-normal">{children}</p>;
};
