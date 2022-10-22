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
      bg: 'bg-white',
      borderRadius: 'rounded-md',
      boxShadow: 'shadow',
    },
  },
  tabsBody: {
    base: {
      padding: 'p-2',
      display: 'block',
      width: 'w-full',
      position: 'relative',
      oferflow: 'overflow-hidden',
    },
  },
  tabsHeader: {
    base: {
      display: 'flex',
      position: 'relative',
      p: 'p-1',
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
        bg: 'bg-wise-navy-blue',
        textColor: 'text-white',
      },
      tabsHeader: {
        bg: 'bg-brand-blue-down',
      },
      tabsPanel: {
        color: 'text-white',
        fontSize: 'text-base',
      },
    },
  },
}
