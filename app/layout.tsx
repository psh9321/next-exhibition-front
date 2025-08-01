import type { Metadata } from "next";

import { LAYOUT_CHILD } from "@/types/component"

import QueryProvider from "@/component/(Home)/provider/QueryProvider";

import "@/styles/reset.css"
import 'react-quill/dist/quill.snow.css';

export const metadata: Metadata = {
  title: "전시 + 緣 (전시와 사람 사이의 '인연')",
  description: "Generated by create next app",
  icons : {
      icon : {
          url : "/favicon.ico"
      }
  }
};


const AppRoot = async ({ children }: LAYOUT_CHILD) => {  
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
      <body suppressHydrationWarning={true}>        
        <QueryProvider>
          {children} 
        </QueryProvider>
        <div id="portal-root"></div>
      </body>
    </html>
  );
}


export default AppRoot