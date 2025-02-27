import { Chip } from "@material-tailwind/react"
import { FlagColor, PresentAbsent } from "./models"
import { color, variant } from "@material-tailwind/react/types/components/alert"

const CIRCLE = "rounded-full inline-block align-middle p-1 text-sm"
type CircleMapping = {
    color?: color,
    variant?: string,
    name: string
}
const ColorMapper: Record<string, CircleMapping> = {
    "RED": { color: "red", name: "Red" },
    "ORANGE": { color: "orange", name: "Orange" },
    "YELLOW": { color: "yellow", name: "Yellow" },
    "GREEN": { color: "green", name: "Green" },
    "LIGHT_BLUE": { color:"cyan", name: "Light Blue"},
    "BLUE": { color: "indigo", name: "Dark Blue" },
    "PURPLE": { color: "purple", name: "Purple" },
    "PINK": { color: "pink", name: "Pink" },
    "BLACK": { color: "gray", name: "Black"},
    "WHITE": { color: "gray", variant: "bg-white", name: "White" },
    "GRAY": { color: "blue-gray", name: "Gray" }
}
export type ColorDotParameters = {
    color: FlagColor,
    present?: PresentAbsent
}
export function ColorDot(params: ColorDotParameters) {
    const colorMapping = ColorMapper[params.color];
    const variant = params.present === "ABSENT" ? "outlined" : "filled";
    const className = params.color == "WHITE" ? 
        (params.present === "ABSENT" ? "text-slate-300 bg-transparent" : "text-black bg-white") 
        : undefined;
    return <Chip size="sm" value={colorMapping.name} variant={variant} color={colorMapping.color} className={className}/>
}