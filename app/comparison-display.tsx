import { JSX } from "react"
import { FlagComparison, FlagComparisonResult } from "./models"

export type ComparisonPaneProps = {
    comparison: FlagComparison
}
export default function ComparisonPane( { comparison }: ComparisonPaneProps) {
    return <div className="p-2 flex flex-col gap-2 m-1">
        <div className="columns-3 gap-3">
            <div className="outline-solid-fixed outline-2 outline-offset-2 outline-red-500 rounded-full text-center text-sm">Absent</div>
            <div className="outline-solid-fixed outline-2 outline-offset-2 outline-amber-500 rounded-full text-center text-sm">Present, More Remain</div>
            <div className="outline-solid-fixed outline-2 outline-offset-2 outline-green-500 rounded-full text-center text-sm">Present, All Found</div>
        </div>
        <div>
            <div className="pb-1">Colors { comparison.foundAllColors ? "(All Found)" : "" }:</div>
            <div className="flex gap-4"> { computeColors(comparison.colors) } </div>
        </div>
        <div>
            <div className="pb-1">Patterns { comparison.foundAllPatterns ? "(All Found)" : ""}:</div>
            <div className="flex gap-4"> { computePatterns(comparison.patterns) } </div>
        </div>
    </div>
}

const CIRCLE = "size-8 rounded-full inline-block outline-solid-fixed outline-2 outline-offset-2"
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
            list.push(<span key={color} className={CIRCLE + " outline-green-500 " + colorMapping[0]} title={colorMapping[1] + " is present"}></span>)
        } else {
            list.push(<span key={color} className={ CIRCLE + " opacity-50 outline-red-500 " + colorMapping[0]} title={colorMapping[1] + " is not present"}></span>)
        }
    }
    return list;
}

const PATTERN = "outline-solid-fixed outline-2 outline-offset-2"
const PatternMapper: Record<string, string> = {
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
    let list = [];
    for (var pattern in patterns) {
        var result = patterns[pattern];
        var filename = "/patterns/" + pattern.toLowerCase() + ".svg";
        var verbiage = PatternMapper[pattern];

        for (var ctr = 0; ctr < result.present; ctr++) {
            const outlineColor = result.foundAll ? "outline-green-500" : "outline-amber-500"
            list.push(<img key={pattern + "-good-" + ctr} className={PATTERN + " " + outlineColor} src={filename} width={32} height={32} title={verbiage + " is present"}></img>)
        }
        for (var ctr = 0; ctr < result.absent; ctr++) {
            list.push(<img key={pattern + "-bad-" + ctr} className={PATTERN + " outline-red-500"} src={filename} width={32} height={32} title={verbiage + " is not present"}></img>)
        }
    }

    return list;
}