import type {ButtonProps} from "../types.ts";

export default function Button({children, onClick}: ButtonProps) {
    return <button className="btn" onClick={onClick}>{children}</button>
}