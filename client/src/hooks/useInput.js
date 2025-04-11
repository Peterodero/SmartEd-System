// import { hasMinLength, isEmail, isEqualsToOtherValue } from "../util/validation";
import { useState } from "react";

// List of valid TLDs
const validTLDs = [
    '.com', '.org', '.net', '.edu', '.gov', '.io', '.co', '.us',
    '.ac', '.ke', '.uk', '.ca', '.de', '.fr', '.jp', '.au',
    '.in', '.nz', '.za', '.it', '.br', '.cn', '.ru', '.mx',
    '.co.uk', '.ac.ke', '.gov.uk', '.edu.au', '.co.za', '.eu',
    '.ch', '.se', '.no', '.fi', '.dk', '.pl', '.be', '.es', '.pt',
    '.gr', '.hk', '.sg', '.tw', '.kr', '.ae', '.sa', '.eg', '.ng'
];

// Helper functions
function hasMinLength(value, minLength) {
    return value && value.length >= minLength;
}

function isEmailValid(email) {
    const isLowerCase = email === email.toLowerCase();
    const startsWithLetter = /^[a-z]/.test(email);
    const containsLetter = /[a-z]/.test(email);
    const emailPattern = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/;

    // Check if the email ends with a valid TLD from the list
    const endsWithValidTLD = validTLDs.some(tld => email.endsWith(tld));

    return emailPattern.test(email) && containsLetter && isLowerCase && startsWithLetter && endsWithValidTLD;
}

export default function useInput() {
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    });

    const [signUpFormData, setSignUpFormData] = useState({
        name: "",
        email: "",
        firstPassword: "",
        secondPassword: "",
        role: "student"
    });

    const [content, setContent] = useState('');
    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false
    });

    const [signUpEdit, setSignUpEdit] = useState({
        name: false,
        email: false,
        firstPassword: false,
        secondPassword: false
    });

    // LOGIN HANDLERS
    function handleLoginChange(event) {
        const { name, value } = event.target;
        setContent("");

        setLoginFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));

        if (!didEdit[name]) {
            setDidEdit(prev => ({...prev, [name]: true }));
        }
    }

    function handleLoginBlur(identifier) {
        setDidEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: true
        }));
    }

    // SIGNUP HANDLERS
    function handleSignUpChange(event) {
        const { name, value } = event.target;
        setContent("");

        setSignUpFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));

        if (!signUpEdit[name]) {
            setSignUpEdit(prev => ({...prev, [name]: true }));
        }
    }

    function handleSignUpBlur(identifier) {
        setSignUpEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: true
        }));
    }

    // VALIDATION
    const nameInvalid = (!/^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+$/.test(signUpFormData.name) &&
        signUpEdit.name
    );

    const loginEmailInvalid = !isEmailValid(loginFormData.email) && didEdit.email;
    const signUpEmailInvalid = !isEmailValid(signUpFormData.email) && signUpEdit.email;

    const loginPasswordInvalid = !hasMinLength(loginFormData.password, 6) && didEdit.password;

    const firstPasswordInvalid = signUpEdit.firstPassword && !hasMinLength(signUpFormData.firstPassword, 6);
    const secondPasswordInvalid = signUpEdit.secondPassword && !hasMinLength(signUpFormData.secondPassword, 6);

    const passWordNotMatch =
        signUpEdit.secondPassword &&
        signUpFormData.firstPassword !== signUpFormData.secondPassword;

    // Final validation triggers
    function handleValidateSignIn() {
        if (loginEmailInvalid || loginPasswordInvalid) {
            setContent("Invalid login details");
        }
    }

    function handleValidateSignUp() {
        if (nameInvalid) {
            setContent("Invalid name. Must be 2+ words, each starting with a capital letter, and contain only letters (no numbers or special characters)");
            return;
        }
        if (!isEmailValid(signUpFormData.email)) {
            setContent("Email must be valid, lowercase, start with a letter, contain at least one letter, and end with a valid TLD.");
            return;
        }
        if (!hasMinLength(signUpFormData.firstPassword, 6) ||
            !hasMinLength(signUpFormData.secondPassword, 6)
        ) {
            setContent("Passwords must be at least 6 characters");
            return;
        }
        if (signUpFormData.firstPassword !== signUpFormData.secondPassword) {
            setContent("Passwords do not match");
            return;
        }
    }

    return {
        handleLoginChange,
        handleSignUpChange,
        handleLoginBlur,
        handleSignUpBlur,
        loginFormData,
        signUpFormData,
        didEdit,
        content,
        loginEmailIsInvalid: loginEmailInvalid,
        loginPasswordIsInvalid: loginPasswordInvalid,
        nameIsInvalid: nameInvalid,
        signUpEmailIsInvalid: signUpEmailInvalid,
        firstPasswordIsInvalid: firstPasswordInvalid,
        secondPasswordIsInvalid: secondPasswordInvalid,
        passWordNotMatch,
        handleValidateSignIn,
        handleValidateSignUp,
    };
}