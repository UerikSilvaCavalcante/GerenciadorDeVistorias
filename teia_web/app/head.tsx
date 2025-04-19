import React from "react";
import { string } from "zod";

export default function Head({title}: {title: string}) {
  return (
    <React.Fragment>
      <title>{title}</title>
      <meta name="description" content="Página de demandas do sistema TEIA" />
      <link rel="shortcut icon" href="assets/building-fill-gear.svg" type="image/icon" />
    </React.Fragment>
  );
}
