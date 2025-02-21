import { JSX, useState } from "react";
import ReactModal from "react-modal";
import { ChargeMapper, PatternMapper } from "./comparison-display";
import Image from 'next/image'

export default function HelpButton() {
    const [isOpen, setOpen] = useState(false);
    ReactModal.setAppElement('#main');

    return <div>
    <button onClick={() => setOpen(true)}>How to Play</button>
    <ReactModal isOpen={isOpen} className="bodyish max-w-5xl max-h-dvh overflow-auto mx-auto">
        <div>
        <button type="button" className="p-2 float-right bg-red-500 rounded-l-lg sticky" onClick={() => setOpen(false)}>X</button>
        <p className="p-2">
            Hi! Welcome to Vexle. The object of the game is simple: I will pick a random world flag, and
            you will try to guess it. For every guess, I will tell you what parts of the flag you guessed are
            on my flag, and which aren't. I will give information on three categories: color, patterns, and charges.
        </p>
        <p className="p-2">
            There are eleven possible colors: Red, Orange, Yellow, Green, Light Blue, Blue, Purple, Pink, Black,
            White, and Gray.
        </p>
        <p className="p-2">
            Patterns are large-scale designs, such
            as stripes, grids, or a field; Charges are smaller embellishments,
            such as stars, seals, or text.
            Unlike colors, the number of patterns or charges present
            is important. For example, if your guess has one triangle, but mine has two, I will
            mark one triangle as present, but also indicate there are 1 or more additional triangles.
        </p>
        <div className="flex p-2">
            <div className="grow">
                Possible Patterns are:
                {getList(PatternMapper, "patterns")}
            </div>
            <div className="grow">
                Possible Charges are:
                {getList(ChargeMapper, "charges")}
            </div>
        </div>
        </div>
    </ReactModal>
    </div>
}

function getList(mapper: Record<string, string>, type: "patterns" | "charges"): JSX.Element {
    const lines = Object.keys(mapper)
        .map(pattern => {
        return <li key={pattern} className="flex">
            <Image src={ "/" + type + "/" + pattern.toLowerCase() + ".svg"} width={32} height={32} alt={pattern}></Image>
            <span>{mapper[pattern]}</span>
            </li>
        })
    return <ul>
        {lines}
    </ul>
}