import React from "react";
import { screen, render } from "@testing-library/react";
import Form from "../views/Form/Form";

describe('Form component', () => {
    it ('must render a title', () => {
        render(<Form />);
        expect(screen.queryByText(/Create your videogame/i)).toBeInTheDocument(); 
    })


});