/**
 * ============================================================
 * MediCare Premium
 * Enterprise Validation Library
 * Version: 1.0
 * ============================================================
 */

const EMAIL_REGEX =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_REGEX =
/^(01)[0125][0-9]{8}$/;

const NATIONAL_ID_REGEX =
/^[2-3][0-9]{13}$/;

const PASSWORD_REGEX =
/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

export default class Validator {

    /* ==========================
       Required
    ========================== */

    static required(value) {

        return value !== null &&
               value !== undefined &&
               String(value).trim() !== "";

    }

    /* ==========================
       Email
    ========================== */

    static email(email) {

        return EMAIL_REGEX.test(email);

    }

    /* ==========================
       Password
    ========================== */

    static password(password) {

        return PASSWORD_REGEX.test(password);

    }

    /* ==========================
       Egyptian Phone
    ========================== */

    static phone(phone) {

        return PHONE_REGEX.test(phone);

    }

    /* ==========================
       National ID
    ========================== */

    static nationalId(id) {

        return NATIONAL_ID_REGEX.test(id);

    }

    /* ==========================
       Age
    ========================== */

    static age(age) {

        age = Number(age);

        return age >= 0 && age <= 120;

    }

    /* ==========================
       Name
    ========================== */

    static name(name) {

        if (!this.required(name)) {

            return false;

        }

        return name.trim().length >= 3;

    }

    /* ==========================
       URL
    ========================== */

    static url(url) {

        try {

            new URL(url);

            return true;

        }

        catch {

            return false;

        }

    }

    /* ==========================
       Number
    ========================== */

    static number(value) {

        return !isNaN(value);

    }

    /* ==========================
       Positive Number
    ========================== */

    static positive(value) {

        return Number(value) > 0;

    }

    /* ==========================
       Date
    ========================== */

    static date(date) {

        return !isNaN(Date.parse(date));

    }

    /* ==========================
       File Size
    ========================== */

    static fileSize(file, maxSize) {

        return file.size <= maxSize;

    }

    /* ==========================
       File Type
    ========================== */

    static fileType(file, allowedTypes) {

        return allowedTypes.includes(file.type);

    }

    /* ==========================
       Empty String
    ========================== */

    static empty(value) {

        return String(value).trim() === "";

    }

    /* ==========================
       Min Length
    ========================== */

    static minLength(value, min) {

        return value.trim().length >= min;

    }

    /* ==========================
       Max Length
    ========================== */

    static maxLength(value, max) {

        return value.trim().length <= max;

    }

    /* ==========================
       Between Length
    ========================== */

    static between(value, min, max) {

        return value.trim().length >= min &&
               value.trim().length <= max;

    }

    /* ==========================
       Match
    ========================== */

    static match(value1, value2) {

        return value1 === value2;

    }

    /* ==========================
       Sanitize Text
    ========================== */

    static sanitize(text) {

        return String(text)

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#39;")

        .trim();

    }

    /* ==========================
       Medical File Validation
    ========================== */

    static medicalFile(file) {

        const allowed = [

            "application/pdf",

            "image/png",

            "image/jpeg",

            "image/jpg",

            "image/webp"

        ];

        const max = 20 * 1024 * 1024;

        return {

            validSize: this.fileSize(file, max),

            validType: this.fileType(file, allowed)

        };

    }

    /* ==========================
       Patient Form Validation
    ========================== */

    static validatePatient(patient) {

        const errors = {};

        if (!this.name(patient.fullName))

            errors.fullName = "Patient name is invalid.";

        if (!this.age(patient.age))

            errors.age = "Age is invalid.";

        if (!this.phone(patient.phone))

            errors.phone = "Phone number is invalid.";

        if (patient.nationalId &&
            !this.nationalId(patient.nationalId))

            errors.nationalId = "National ID is invalid.";

        return {

            valid: Object.keys(errors).length === 0,

            errors

        };

    }

    /* ==========================
       Login Validation
    ========================== */

    static validateLogin(email, password) {

        const errors = {};

        if (!this.email(email))

            errors.email = "Invalid email address.";

        if (!this.required(password))

            errors.password = "Password is required.";

        return {

            valid: Object.keys(errors).length === 0,

            errors

        };

    }

}