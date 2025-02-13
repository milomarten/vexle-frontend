import { JSX } from "react"
import { FlagComparison } from "./models"

export type ComparisonPaneProps = {
    comparison: FlagComparison
}
export default function ComparisonPane( { comparison }: ComparisonPaneProps) {
    return <div className="p-2">
        Colors { comparison.foundAllColors ? "(All Found)" : "" }:
        <div className="flex gap-4"> { computeColors(comparison.colors) } </div>
    </div>
}

const CIRCLE = "size-8 rounded-full inline-block outline-solid outline-2 outline-offset-2"
const ColorMapper: Record<string, string[]> = {
    "RED": ["bg-red-800", "Red"],
    "ORANGE": ["bg-orange-800", "Orange"],
    "YELLOW": ["bg-yellow-800", "Yellow"],
    "GREEN": ["bg-green-800", "Green"],
    "LIGHT_BLUE": ["bg-cyan-800", "Light Blue"],
    "BLUE": ["bg-blue-800", "Blue"],
    "PURPLE": ["bg-violet-800", "Purple"],
    "PINK": ["bg-pink-800", "Pink"],
    "BLACK": ["bg-black", "Black"],
    "WHITE": ["bg-white", "White"],
    "GRAY": ["bg-slate-800", "Gray"],
}
function computeColors(colors: Record<string, boolean>): JSX.Element[] {
    let list = [];
    for (var color in colors) {
        var isPresent = colors[color];
        var colorMapping = ColorMapper[color];
        if (isPresent) {
            list.push(<span style={{outlineStyle: "solid"}} className={CIRCLE + " outline-green-500 " + colorMapping[0]} title={colorMapping[1]}></span>)
        } else {
            list.push(<span style={{outlineStyle: "solid"}} className={ CIRCLE + " opacity-50 outline-red-500 " + colorMapping[0]} title={colorMapping[1]}></span>)
        }
    }
    return list;
}