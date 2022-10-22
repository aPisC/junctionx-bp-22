export const ModalStyle = {
  backdrop: {
    flex: 'flex',
    position: 'absolute',
    right: 'right-0',
    bottom: 'bottom-0',
    left: 'left-0',
    top: 'top-0',
    overflow: 'overflow-hidden',
    p: 'p-4',
    z: 'z-[999]',
    cursor: 'cursor-pointer',
  },
  blur: {
    bgBlur: 'backdrop-blur-sm',
  },
  rounded: {
    rounded: 'rounded-lg',
  },
  placements: {
    'top-left': {
      x: 'justify-start',
      y: ' items-start',
    },
    'top-center': {
      x: 'justify-center',
      y: ' items-start',
    },
    'top-right': {
      x: 'justify-end',
      y: ' items-start',
    },
    'center-left': {
      x: 'justify-start',
      y: ' items-center',
    },
    center: {
      x: 'justify-center',
      y: 'items-center',
    },
    'center-right': {
      x: 'justify-end',
      y: 'items-center',
    },
    'bottom-left': {
      x: 'justify-start',
      y: ' items-end',
    },
    'bottom-center': {
      x: 'justify-center',
      y: ' items-end',
    },
    'bottom-right': {
      x: 'justify-end',
      y: ' items-end',
    },
  },
  body: {
    w: 'w-full',
    maxW: 'max-w-3xl',
    h: 'h-fit',
    minH: 'min-h-[20%]',
    maxH: 'max-h-[80%]',
    flex: 'flex',
    flexDirection: 'flex-col',
    positon: 'items-center',
    padding: 'p-4',
    overflow: 'overflow-auto',
    cursor: 'cursor-default',
  },
  variants: {
    base: {
      bg: 'bg-blue-200',
      border: 'border',
      borderColor: 'border-blue-600',
    },
  },
}
