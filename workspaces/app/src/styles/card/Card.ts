export const CardStyle = {
  default: {
    base: {
      width: 'w-full',
      cursor: 'cursor-pointer',
      z: 'z-[999]',
    },
    expanded: {
      background: {
        p: 'p-4',
        position: 'absolute',
        left: 'left-0',
        right: 'right-0',
        top: 'top-0',
        bottom: 'bottom-0',
        blur: 'backdrop-blur-sm',
        cursor: 'cursor-pointer',
        z: 'z-[999]',
      },
      position: {
        flex: 'flex',
        height: 'h-full',
        xPosition: 'justify-center',
        yPosition: 'items-center',
      },
      container: {
        overflow: 'overflow-auto',
        position: 'relative',
        cursor: 'cursor-default',
        maxWidth: 'max-w-3xl',
        width: 'w-full',
        maxH: 'max-h-[80%]',
        p: 'p-4',
        flex: 'flex',
        flexDirection: 'flex-col',
      },
      closeButton: {
        text: 'text-2xl',
        p: 'p-2',
        cursor: 'cursor-pointer',
        position: 'absolute',
        right: 'right-0',
        top: 'top-0',
      },
    },
    rounded: {
      rounded: 'rounded-lg',
    },
  },
  variants: {
    base: {
      default: {},
      base: {
        borderColor: 'border-blue-300',
      },
      expanded: {
        background: {},
        position: {},
        container: {
          bg: 'bg-blue-100',
          text: 'text-blue-900',
          border: 'border',
          borderColor: 'border-blue-600',
        },
        closeButton: {},
      },
    },
  },
}
