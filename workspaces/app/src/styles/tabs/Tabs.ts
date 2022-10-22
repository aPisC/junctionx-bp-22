export const TabsStyle = {
  base: {
    display: 'block',
    overflow: 'overflow-hidden',
  },
  tab: {
    base: {
      display: 'grid',
      placeItems: 'place-items-center',
      textAlign: 'text-center',
      width: 'w-full',
      height: 'h-full',
      position: 'relative',
      bg: 'bg-transparent',
      fontSmoothing: 'antialiased',
      userSelect: 'select-none',
      cursor: 'cursor-pointer',
    },
    disabled: {
      opacity: 'opacity-50',
      cursor: 'cursor-not-allowed',
      pointerEvents: 'pointer-events-none',
      userSelect: 'select-none',
    },
    indicator: {
      position: 'absolute',
      top: 'top-0',
      left: 'left-0',
      right: 'right-0',
      zIndex: 'z-[1]',
      height: 'h-full',
      bg: 'bg-brand-blue',
      borderRadius: 'rounded-md',
      boxShadow: 'shadow',
    },
  },
  tabsBody: {
    base: {
      display: 'block',
      width: 'w-full',
      position: 'relative',
      oferflow: 'overflow-hidden',
      rounded: 'rounded-lg',
    },
  },
  tabsHeader: {
    base: {
      display: 'flex',
      position: 'relative',
      rounded: 'rounded-lg',
    },
  },
  tabsPanel: {
    base: {
      width: 'w-full',
      fontSmoothing: 'antialiased',
    },
  },
  rounded: {
    br: 'rounded-lg',
  },
  variants: {
    base: {
      tabsBody: {
        textColor: 'text-white',
        bg: 'bg-keyline-grey',
      },
      tabsHeader: {
        bg: 'bg-keyline-grey',
      },
      tabsPanel: {
        color: 'text-white',
        fontSize: 'text-base',
      },
    },
  },
}
