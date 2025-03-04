import { Chip } from "@material-tailwind/react"
import { FlagCharges, FlagColor, FlagComparisonResult, FlagPattern, MultiPresentAbsent, PresentAbsent } from "./models"
import { color } from "@material-tailwind/react/types/components/alert"

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
    const value = params.present == "ABSENT" ? "No " + colorMapping.name : colorMapping.name;
    return <Chip size="sm" value={value} variant={variant} color={colorMapping.color} className={className}/>
}

type ChargeMappingParameters = {
    type: "charge",
    value: FlagCharges,
    count?: FlagComparisonResult
};
const ChargeMapper: Record<FlagCharges, string> = {
    STAR: "Star",
    SUN: "Sun",
    MOON: "Moon",
    PLANT: "Plant",
    ANIMAL: "Animal",
    EMBLEM: "Emblem",
    CROSS: "Cross",
    TERRITORY: "Territory",
    WEAPON: "Weapon",
    ANOTHER_FLAG: "Another Flag",
    TEXT: "Text",
    HUMAN: "Human",
    BUILDING: "Building",
    HEADGEAR: "Headgear"
};
type PatternMappingParameters = {
    type: "pattern",
    value: FlagPattern,
    count?: FlagComparisonResult
};
const PatternMapper: Record<FlagPattern, string> = {
    CROSS: "Cross",
    FIELD: "Field",
    HORIZONTAL_STRIPE: "Horiz. Stripe",
    VERTICAL_STRIPE: "Vert. Stripe",
    DIAGONAL_STRIPE: "Diag. Stripe",
    DIAGONAL_CROSS: "Diag. Cross",
    GRID: "Grid",
    DIAGONAL_GRID: "Diag. Grid",
    CANTON: "Canton",
    BORDER: "Border",
    TRIANGLE: "Triangle",
    ORNAMENT: "Ornament",
    CIRCLE: "Circle",
    DIAMOND: "Diamond",
    CHEVRON: "Chevron"
};
export function IconDot(params: ChargeMappingParameters | PatternMappingParameters) {
    const url = `/${params.type}s/${params.value.toLowerCase()}.svg`;
    const color = colorForPresent(params.count);
    const value = params.type == "charge" ? ChargeMapper[params.value] : PatternMapper[params.value];

    return <Chip size="sm" value={textForPresent(params.count, value)} color={color} icon={<img src={url} width={32} height={32} />}/>
}

function colorForPresent(result: FlagComparisonResult | undefined): color {
    if (result) {
        if (result.present == 0) {
            return "red";
        } else if (result.present > 0 && result.allFound && result.absent == 0) {
            return "green";
        } else if (result.present > 0 && !result.allFound) {
            return "yellow";
        } else if (result.present > 0 && result.allFound && result.absent > 0) {
            return "blue";
        }
    }
    return "blue-gray";
}

function textForPresent(result: FlagComparisonResult | undefined, raw: string): string {
    if (result) {
        if (result.present == 0) {
            return `No ${raw}`;
        } else if (result.present > 0 && result.allFound && result.absent == 0) {
            return `Found all ${result.present} ${raw}`
        } else if (result.present > 0 && !result.allFound) {
            return `Found ${result.present} / ? ${raw}`
        } else if (result.present > 0 && result.allFound && result.absent > 0) {
            return `Found ${result.present + result.absent} / ${result.present} ${raw}`
        }
    }
    return raw;
}