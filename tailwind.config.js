const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./components/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  // purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // customForms: theme => ({
      //   default: {
      //     input: {
      //       borderRadius: theme('borderRadius.lg'),
      //       backgroundColor: theme('colors.gray.200'),
      //       '&:focus': {
      //         backgroundColor: theme('colors.white'),
      //       }
      //     },
      //     select: {
      //       borderRadius: theme('borderRadius.lg'),
      //       boxShadow: theme('boxShadow.default'),
      //     },
      //     checkbox: {
      //       width: theme('spacing.6'),
      //       height: theme('spacing.6'),
      //     },
      //   },
      // }),

      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },

      colors: {
        // 4D color 선언
        primary: {
          red: {
            dark: "#800000​",
            DEFAULT: "#C00000",
          },
          gray: "#2F4858",
          // default, dark, light는 임의로 지정한 컬러임, 나중에 바꾸기
          DEFAULT: "#6366f1",
          dark: "#4338ca",
          light: "#a5b4fc",
        },
        secondary: {
          vermilion: "#CF0157",
          violet: "#A22F81",
          purple: "#65488C",
          navy: "#334D79",

          gray: {
            medium: "#7F7F7F",
            light: "#D9D9D9",
          },
        },
        background: {
          ivory: "#EDE6DF",
          gray: "#EBEBEB",
          disabled: "#736f6f4d",
        },
        // TODO: 자주 사용하는 컬러 선언 할 것(버튼 컬러, 뱃지 컬러 등 -네이버 라이브 커머스 등 참조)
        header: "rgba(255, 255, 255, 0.9)",
        disabled: "#736f6f4d",
        danger: {
          DEFAULT: "#b91c1c",
          dark: "#7f1d1d",
        },
        layout: {
          // 디폴트를 제외한 색은 내가 임의로 지정함
          dark: "#493465",
          DEFAULT: "#65488C",
          light: "#976cd0",
        },
        footer: "#D9D9D9",
        backdrop: "rgba(0, 0, 0, 0.75)",
      },

      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
        chase: {
          "0%": {
            top: 0,
            left: 0,
          },

          "12.5%": {
            top: 0,
            left: "50%",
          },

          "25%": {
            top: 0,
            left: "50%",
          },

          "37.5%": {
            top: "50%",
            left: "50%",
          },

          "50%": {
            top: "50%",
            left: "50%",
          },

          "62.5%": {
            top: "50%",
            left: 0,
          },

          "75%": {
            top: "50%",
            left: 0,
          },

          "87.5%": {
            top: 0,
            left: 0,
          },

          "100%": {
            top: 0,
            left: 0,
          },
        },
        bounceHorizontal: {
          "0%, 100%": { transform: "translateX(0.5rem)", opacity: 0 },
          "50%": { transform: "translateX(0px)", opacity: 1 },
        },
      },

      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite",
        bounceHorizontal: "bounceHorizontal 1s ease-in infinite",
        chase: "chase 2s linear infinite",
      },

      screens: {
        xxs: "320px",
        xs: "475px",
      },

      spacing: {
        0.25: "0.1rem",
        1.2: "0.3rem",
        header: "4rem",
        footer: "6rem",
        content: "calc(100vh - 12rem)",
        sidenav: "17rem",
        "1/10": "10%",
        "1/5": "20%",
        18: "4.5rem",
      },

      fontSize: {
        xxs: ["0.3rem", { lineHeight: "1rem" }],
      },

      flexGrow: {
        3: 3,
      },

      minHeight: {
        content: "calc(100vh - 12rem)",
        100: "20rem",
      },

      minWidth: {
        0: "0",
        10: "2.5rem",
        20: "5rem",
        32: "8rem",
        40: "10rem",
        "1/10": "10%",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
        sidenav: "17rem",
      },
      maxWidth: {
        main: "calc(100vw-250px)",
      },
      height: {
        fit: "fit-content",
        inherit: "inherit",
      },
      width: {
        sidenav: "17rem",
        main: "calc(100vw-17rem)",
      },

      // inset: (theme, { negative }) => ({
      // }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active", "checked", "odd", "disabled", "important"],
      borderColor: ["checked"],
      fill: ["hover", "focus"],
      textColor: ["disabled"],
      outline: ["hover", "active", "focus"],
      margin: ["first"],
      scale: ["active", "group-hover", "hover"],
    },
  },
  plugins: [
    require("@tailwindcss/custom-forms"),

    // Complex variants
    // 1. !important
    plugin(function ({ addVariant }) {
      addVariant("important", ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });
    }),

    // 2. before, after pseudo class
    plugin(({ addVariant, e }) => {
      addVariant("before", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`before${separator}${className}`)}::before`;
        });
      });
      addVariant("after", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`after${separator}${className}`)}::after`;
        });
      });
    }),
    plugin(({ addUtilities }) => {
      const contentUtilities = {
        ".content": {
          content: "attr(data-content)",
        },
        ".content-before": {
          content: "attr(data-before)",
        },
        ".content-after": {
          content: "attr(data-after)",
        },
      };
      const inputUtilities = {
        ".label-after": {
          content: " ",
          // backgroundColor: "red",
          position: "absolute",
          left: "0px",
          bottom: "-1px",
          borderBottom: "3px solid black",
          transform: "translateX(-100%)",
          transition: "transform 0.3 ease",
        },
      };

      addUtilities(contentUtilities, ["before", "after"]);
      addUtilities(inputUtilities, ["after"]);
    }),
  ],
};
