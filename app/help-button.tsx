import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import { FlagCharges, FlagChargesOptions, FlagColorOptions, FlagPattern, FlagPatternOptions } from "./models";
import { ColorDot, IconDot } from "./iconography";

export function HelpButton() {
    const [isOpen, setOpen] = useState(false);

    return <div>
    <Button color="light-green" onClick={() => setOpen(true)}>How to Play</Button>
    <Dialog open={isOpen} handler={() => setOpen(false)} size="md">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() => setOpen(false)}>
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
        </svg>
        <DialogBody>
            <p className="p-2">
                Hi! Welcome to Vexle. The object of the game is simple: I will pick a random world flag, and
                you will try to guess it. For every guess, I will tell you what parts of the flag you guessed are
                on my flag, and which aren&apos;t. I will give information on three categories: color, patterns, and charges.
            </p>
            <p className="p-2">
                I will give information on three categories: color, patterns, and charges. After each guess, I&apos;ll show you all the
                features of that flag, and mark if that feature is present, or not present, in the flag. You can then use that
                clue for your next guess!
            </p>
            <p className="p-2">
                If you&apos;re unfamiliar with some of the terms on this site, check out the Color List!
            </p>
        </DialogBody>
    </Dialog>
    </div>
}

export function ColorHelpButton() {
    const [isOpen, setOpen] = useState(false);

    const colorList = FlagColorOptions
        .map(color => <ColorDot key={color + "-normal"} color={color}/>);
    
    const colorListBad = FlagColorOptions
        .map(color => <ColorDot key={color + "-absent"} color={color} present="ABSENT"/>);

    return <>
        <Button color="light-green" onClick={() => setOpen(true)}>Color List</Button>
        <Dialog open={isOpen} handler={() => setOpen(false)} size="md">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() => setOpen(false)}>
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
        </svg>
        <DialogBody className="h-[42rem] overflow-scroll">
            <div className="p-2">
                Flags have been divided into 11 colors. 
            </div>
            <div className="p-2">
                This is what the badges look like if the color is present:
                <div className="flex flex-wrap gap-2">{colorList}</div>
            </div>
            <div className="p-2">
                This is what the badges look like if the color is NOT present:
                <div className="flex flex-wrap gap-2">{colorListBad}</div>
            </div>
        </DialogBody>
    </Dialog>
    </>;
}

const PatternGlossary: Record<FlagPattern, string> = {
    FIELD: "A large expanse of a single color. A flag will always have a field, or some form of stripes.",
    HORIZONTAL_STRIPE: "A strip of color running horizontally across the flag.",
    VERTICAL_STRIPE: "A strip of color running vertically down the flag.",
    DIAGONAL_STRIPE: "A strip of color running at some oblique angle.",
    CROSS: "The combination of a horizontal and vertical stripe. Must run across the entirety of the flag.",
    DIAGONAL_CROSS: "The combination of two diagonal stripes of opposing directions.",
    GRID: "A checkerboard pattern, composed of squares, at least 2x2 in dimension.",
    DIAGONAL_GRID: "A checkerboard pattern, composed of diamonds, at least 2x2 in dimension.",
    CANTON: "A small rectangle in the top-left corner of the flag.",
    BORDER: "A small strip of color going along every edge of the flag.",
    TRIANGLE: "A three-sided shape of some form",
    ORNAMENT: "A decorative element, representing some pattern culturally significant to the region, such as an arabesque.",
    CIRCLE: "A circular shape of some form",
    DIAMOND: "A four-sided shape of some form",
    CHEVRON: "A V-shaped pattern of any orientation"
}
const ChargeGlossary: Record<FlagCharges, string> = {
    CROSS: "A horizontal and vertical line intersecting. Differs from a cross Pattern, in that this can be any size.",
    STAR: "A star of four or more points. Crucially, stars have triangular points, not wavy like a sun.",
    SUN: "A sun element, which should include at least the disc and some number of wavy rays.",
    MOON: "A moon element, typically a crescent.",
    PLANT: "Some form of vegetation, such as a plant, leaf, or tree.",
    ANIMAL: "Some form of non-human animal life, such as a bear or a dragon.",
    EMBLEM: "A detailed symbol that represents the state.",
    TERRITORY: "The map contains a map of the territory.",
    WEAPON: "The flag contains a weapon on it, such as a sword.",
    ANOTHER_FLAG: "The flag contains another flag, typically the sovereign of the territory. Note that the UK Flag here is a joke, and doesn't guarantee that is the actual flag present.",
    TEXT: "The flag contains text in some language.",
    HUMAN: "A human being.",
    BUILDING: "A significant building, such as a castle.",
    HEADGEAR: "Something worn on the head, such as a helmet or crown."
}

export function PatternHelpButton() {
    const [isOpen, setOpen] = useState(false);

    const patternList = FlagPatternOptions
        .map(pattern => <div key={pattern + "-normal"}  className="flex flex-row gap-1">
            <IconDot type="pattern" value={pattern}/>
            { PatternGlossary[pattern] }
        </div>);

    return <>
        <Button color="light-green" onClick={() => setOpen(true)}>Pattern List</Button>
        <Dialog open={isOpen} handler={() => setOpen(false)} size="lg">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() => setOpen(false)}>
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
        </svg>
        <DialogBody className="h-[42rem] overflow-scroll">
            <div className="p-2">
                Flags can have one or more patterns, which represent a large element of one color. Furthermore,
                each flag can have one or more of any single pattern. This is represented as such in the UI:
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-1">
                        <IconDot type="pattern" value="HORIZONTAL_STRIPE" count={{present: 0, absent: 3, allFound: true}} />
                        There are no horizontal stripes in the target flag.
                    </div>
                    <div className="flex flex-row gap-1">
                        <IconDot type="pattern" value="HORIZONTAL_STRIPE" count={{present: 2, absent: 0, allFound: false}} />
                        There are 2 horizontal stripes in the guessed flag, but there are more in the target flag.
                    </div>
                    <div className="flex flex-row gap-1">
                        <IconDot type="pattern" value="HORIZONTAL_STRIPE" count={{present: 2, absent: 0, allFound: true}} />
                        There are exactly 2 horizontal stripes in the target flag.
                    </div>
                    <div className="flex flex-row gap-1">
                        <IconDot type="pattern" value="HORIZONTAL_STRIPE" count={{present: 2, absent: 1, allFound: true}} />
                        There are 3 horizontal stripes in the guessed flag, but there are only 2 in the target flag.
                    </div>
                </div>
            </div>
            <div className="p-2">
                Here is an explanation of all the patterns:
                <div className="flex flex-col gap-2">{patternList}</div>
            </div>
        </DialogBody>
    </Dialog>
    </>;
}

export function ChargeHelpButton() {
    const [isOpen, setOpen] = useState(false);

    const chargeList = FlagChargesOptions
        .map(pattern => <div key={pattern + "-normal"} className="flex flex-row gap-1">
            <IconDot type="charge" value={pattern}/>
            { ChargeGlossary[pattern] }
        </div>);

    return <>
        <Button color="light-green" onClick={() => setOpen(true)}>Charge List</Button>
        <Dialog open={isOpen} handler={() => setOpen(false)} size="lg">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() => setOpen(false)}>
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
        </svg>
        <DialogBody className="h-[42rem] overflow-scroll">
            <div className="p-2">
                Flags can have one or more charges, which represent a small decorative element. Furthermore,
                each flag can have one or more of any single pattern. This is represented as such in the UI:
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-1">
                        <IconDot type="charge" value="STAR" count={{present: 0, absent: 3, allFound: true}} />
                        There are no stars in the target flag.
                    </div>
                    <div className="flex flex-row gap-1">
                        <IconDot type="charge" value="STAR" count={{present: 2, absent: 0, allFound: false}} />
                        There are 2 stars in the guessed flag, but there are more in the target flag.
                    </div>
                    <div className="flex flex-row gap-1">
                        <IconDot type="charge" value="STAR" count={{present: 2, absent: 0, allFound: true}} />
                        There are exactly 2 stars in the target flag.
                    </div>
                    <div className="flex flex-row gap-1">
                        <IconDot type="charge" value="STAR" count={{present: 2, absent: 1, allFound: true}} />
                        There are 3 stars in the guessed flag, but there are only 2 in the target flag.
                    </div>
                </div>
            </div>
            <div className="p-2">
                Since Emblems are typically quite complex, Emblems specifically may count as other Charges too. For
                example, take the flag of Mexico (🇲🇽). Its emblem prominently contains a bird, and as such, Mexico
                is considered to have an Animal on its flag. Note that this is only for prominent features; typically,
                anything that can be seen clearly on the flag&apos;s emoji. I may deprecate this behavior, so don&apos;t rely on it.
            </div>
            <div className="p-2">
                Other Flags are also a special case. The colors, patterns, and charges on an Other Flag are not included
                in the flag&apos;s list of colors, patterns, and charges. For example, the flag of Bermuda (🇧🇲) is considered
                only as red, with a field, a canton, another flag, and an emblem. This is because including the &quot;sub-flag&quot;&apos;s
                features can be cluttering, and particularly dilutes the usefulness of Red, White, and Blue colors (since most
                sub-flag&apos;s are either the UK or France).
            </div>
            <div className="p-2">
                Here is an explanation of all the charges:
                <div className="flex flex-col gap-2">{chargeList}</div>
            </div>
        </DialogBody>
    </Dialog>
    </>;
}