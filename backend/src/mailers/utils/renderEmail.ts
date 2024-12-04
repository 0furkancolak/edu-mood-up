import { render } from "@react-email/render";
import * as React from "react";

export default function renderEmailToHtml(email: React.ReactElement) {
    const emailHtml = render(email, {
        pretty: true,
    });
    return emailHtml;
};
