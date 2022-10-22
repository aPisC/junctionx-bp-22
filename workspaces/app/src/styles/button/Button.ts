export const ButtonStyle = {
  base: {
    cursor: 'cursor-pointer',
    transition: 'transition ease-in-out',
    duration: 'duration-300',
  },
  disabled: {
    cursor: 'cursor-not-allowed',
    opacity: 'opacity-50',
  },
  rounded: {
    rounded: 'rounded-lg',
  },
  variants: {
    primary: {
      base: {
        color: 'text-white',
        gb: 'bg-brand-blue',
        paddingX: 'px-4',
        paddingY: 'py-2',
      },
      hover: {
        bg: 'hover:bg-brand-blue-hover',
      },
      active: {
        bg: 'active:bg-brand-blue-down',
      },
    },
    flag: {
      base: {
        color: 'text-white',
        ratio: 'aspect-square',
        gb: 'bg-brand-blue',
        borderColor: 'border-brand-blue-down',
        rounded: 'rounded-full',
        border: 'border-4',
      },
      hover: {
        bg: 'hover:bg-brand-blue-hover',
        border: 'hover:border-brand-blue-hover',
      },
      active: {
        bg: 'active:bg-brand-blue-down',
        border: 'active:border-brand-blue-down',
      },
    },
    hub: {
      base: {
        w: 'w-full',
        color: 'text-white',
        gb: 'bg-brand-blue',
        rounded: 'rounded-lg',
        paddingX: 'px-4',
        paddingY: 'py-2',
      },
      hover: {
        bg: 'hover:bg-brand-blue-hover',
      },
      active: {
        bg: 'active:bg-brand-blue-down',
      },
    },
  },
}
