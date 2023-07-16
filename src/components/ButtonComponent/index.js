import { ButtonStyles } from "./styles";

export const ButtonComponent = (props) => {
    return (
        <ButtonStyles cor={props.cor}>{props.texto}</ButtonStyles>
    )
}
