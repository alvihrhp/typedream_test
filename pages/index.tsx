import type { NextPage } from "next";
/** React */
import React, { useState } from "react";
/** Local Components */
import { Card, Editor } from "../components";
/** utils */
import ExampleDocument from "../utils/exampleDocument";

const Home: NextPage = () => {
  const [document, setDocumnet] = useState(ExampleDocument);

  return (
    <div className="w-screen h-screen">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-[600px]">
          <Card bgColor="bg-[#ff0060]" shadowColor="shadow-[#ff0060]/75">
            <Editor document={document} setDocument={setDocumnet} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
