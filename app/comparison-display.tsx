import { JSX } from "react"
import { FlagComparison, FlagComparisonResult } from "./models"
import Image from 'next/image'

export type ComparisonPaneProps = {
    comparison: FlagComparison
}


export default function ComparisonPane( { comparison }: ComparisonPaneProps) {
    return <div className="p-2 flex flex-col gap-2 m-1">
        <div className="flex flex-nowrap gap-3">
            <div className="grow outline-solid-fixed outline-2 outline-offset-2 outline-red-500 rounded-full text-center text-sm">Absent</div>
            <div className="grow outline-solid-fixed outline-2 outline-offset-2 outline-amber-500 rounded-full text-center text-sm">Present, More Remain</div>
            <div className="grow outline-solid-fixed outline-2 outline-offset-2 outline-green-500 rounded-full text-center text-sm">Present, All Found</div>
        </div>
        <div>
            <div className="pb-1">Colors { comparison.foundAllColors ? "(All Found)" : "" }:</div>
            <div className="flex flex-wrap gap-4"> { computeColors(comparison.colors) } </div>
        </div>
        <div>
            <div className="pb-1">Patterns { comparison.foundAllPatterns ? "(All Found)" : ""}:</div>
            <div className="flex flex-wrap gap-4"> { computePatterns(comparison.patterns) } </div>
        </div>
        <div>
            <div className="pb-1">Charges { comparison.foundAllCharges ? "(All Found)" : ""}:</div>
            <div className="flex flex-wrap gap-4"> { computeCharges(comparison.charges) } </div>
        </div>
    </div>
}

const ColorMapper: Record<string, string[]> = {
    "RED": ["bg-red-800", "Red", "RED"],
    "ORANGE": ["bg-orange-800", "Orange", "ORA"],
    "YELLOW": ["bg-yellow-500", "Yellow", "YEL"],
    "GREEN": ["bg-green-800", "Green", "GRE"],
    "LIGHT_BLUE": ["bg-cyan-500", "Light Blue", "AQU"],
    "BLUE": ["bg-blue-800", "Blue", "BLU"],
    "PURPLE": ["bg-violet-800", "Purple", "PUR"],
    "PINK": ["bg-pink-500", "Pink", "PIN"],
    "BLACK": ["bg-black", "Black", "BLA"],
    "WHITE": ["bg-white", "White", "WHI"],
    "GRAY": ["bg-slate-500", "Gray", "GRA"],
}
function computeColors(colors: Record<string, boolean>): JSX.Element[] {
    const list = [];
    for (const color in colors) {
        const isPresent = colors[color];
        list.push(<Circle key={color} type={color} status={isPresent ? "PRESENT" : "ABSENT"}></Circle>)
    }
    return list;
}

type ColorStatus = "PRESENT" | "ABSENT";
const CIRCLE = "rounded-full inline-block outline-solid-fixed outline-2 outline-offset-2 align-middle p-1"
export function Circle({ type, status }: {type: string, status: ColorStatus}) {
    const colorMapping = ColorMapper[type];
    if (status == "PRESENT") {
        return <span className={CIRCLE + " outline-green-500 " + colorMapping[1].toLowerCase() + " " + colorMapping[0]} title={colorMapping[1] + " is present"}>{colorMapping[2]}</span>;
    } else {
        return <span className={CIRCLE + " opacity-50 outline-red-500 " + colorMapping[1].toLowerCase() + " " + colorMapping[0]} title={colorMapping[1] + " is not present"}>{colorMapping[2]}</span>
    }
}

const PATTERN = "outline-solid-fixed outline-2 outline-offset-2"
export const PatternMapper: Record<string, string> = {
    FIELD: "Field",
    HORIZONTAL_STRIPE: "Horizontal Stripe",
    VERTICAL_STRIPE: "Vertical Stripe",
    DIAGONAL_STRIPE: "Diagonal Stripe",
    CROSS: "Cross (Greek, Symmetric, or Nordic)",
    DIAGONAL_CROSS: "Diagonal Cross (Saltire)",
    GRID: "Grid (Quadrisection)",
    DIAGONAL_GRID: "Diagonal Grid (Diagonal Quadrisection)",
    CANTON: "Canton",
    BORDER: "Border (All Sides)",
    TRIANGLE: "Triangle (Includes Pile, and anything else with three sides)",
    ORNAMENT: "Ornament (Decorative)",
    CIRCLE: "Circle",
    DIAMOND: "Diamond",
    CHEVRON: "Chevron, Pall, or Arrowhead"
}
function computePatterns(patterns: Record<string, FlagComparisonResult>): JSX.Element[] {
    const list = [];
    for (const pattern in patterns) {
        const result = patterns[pattern];
        const filename = "/patterns/" + pattern.toLowerCase() + ".svg";
        const verbiage = PatternMapper[pattern];

        for (let ctr = 0; ctr < result.present; ctr++) {
            const outlineColor = result.foundAll ? "outline-green-500" : "outline-amber-500"
            list.push(<Image key={pattern + "-good-" + ctr} className={PATTERN + " " + outlineColor} src={filename} width={32} height={32} title={verbiage + " is present"} alt={verbiage + " is present"}></Image>)
        }
        for (let ctr = 0; ctr < result.absent; ctr++) {
            list.push(<Image key={pattern + "-bad-" + ctr} className={PATTERN + " outline-red-500"} src={filename} width={32} height={32} title={verbiage + " is not present"} alt={verbiage + " is not present"}></Image>)
        }
    }

    return list;
}

export const ChargeMapper: Record<string, string> = {
    STAR: "A star (four or more points, suns don't count)",
    SUN: "A sun (traditional star shapes don't count)",
    MOON: "A moon (typically crescent)",
    PLANT: "A plant (tree, flower, or leaf)",
    ANIMAL: "An animal (non-human)",
    EMBLEM: "An emblem (some sort of complex seal)",
    CROSS: "A small cross",
    TERRITORY: "A map of the territory",
    WEAPON: "A weapon (such as a sword)",
    ANOTHER_FLAG: "Another country's flag",
    TEXT: "Text",
    HUMAN: "A human",
    BUILDING: "A building",
    HEADGEAR: "Headgear (such as a hat or crown)"
}
function computeCharges(charges: Record<string, FlagComparisonResult>): JSX.Element[] {
    const list = [];
    for (const charge in charges) {
        const result = charges[charge];
        const verbiage = ChargeMapper[charge];
        const filename = "/charges/" + charge.toLowerCase() + ".svg";

        for (let ctr = 0; ctr < result.present; ctr++) {
            const outlineColor = result.foundAll ? "outline-green-500" : "outline-amber-500"
            list.push(<Image key={charge + "-good-" + ctr} className={PATTERN + " " + outlineColor} src={filename} width={32} height={32} title={verbiage + " is present"} alt={verbiage + " is present"}></Image>)
        }
        for (let ctr = 0; ctr < result.absent; ctr++) {
            list.push(<Image key={charge + "-bad-" + ctr} className={PATTERN + " outline-red-500"} src={filename} width={32} height={32} title={verbiage + " is not present"} alt={verbiage + " is not present"}></Image>)
        }
    }

    return list;
}