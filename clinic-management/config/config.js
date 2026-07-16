/**
 * ============================================================
 * MediCare Premium
 * Enterprise Configuration
 * ============================================================
 */

const CONFIG = Object.freeze({

    APP_NAME: "MediCare Premium",

    APP_VERSION: "1.0.0",

    API: {

        BASE_URL: "http://localhost:5000/api",

        TIMEOUT: 15000

    },

    AUTH: {

        TOKEN_KEY: "medicare_access_token",

        USER_KEY: "medicare_user",

        REMEMBER_KEY: "remember_me"

    },

    STORAGE: {

        MAX_FILE_SIZE: 20 * 1024 * 1024,

        ALLOWED_IMAGE_TYPES: [

            "image/png",

            "image/jpeg",

            "image/jpg",

            "image/webp"

        ],

        ALLOWED_DOCUMENT_TYPES: [

            "application/pdf"

        ]

    },

    PAGINATION: {

        DEFAULT_PAGE: 1,

        DEFAULT_LIMIT: 20

    }

});

export default CONFIG;