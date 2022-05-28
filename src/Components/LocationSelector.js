import React from "react";

import {
    DropdownWrapper,
    StyledSelect,
    StyledOption,
    StyledLabel
  } from "../styles.js";

export function LocationSelector(props) {
    return (
        <DropdownWrapper action={props.action} onChange={props.onChange} defaultValue={props.defaultValue}>
            <StyledLabel htmlFor="urbanAreas">
                {props.formLabel}
            </StyledLabel>
            <StyledSelect id="urbanAreas" name={props.name}>
                {props.children}
            </StyledSelect>
        </DropdownWrapper>
            
    )
}

export function Option(props) {
    return (
        <StyledOption selected={props.selected} data-infolink={props.infolink}>
            {props.value}
        </StyledOption>
    )
}