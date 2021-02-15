import { animate, state, style, transition, trigger } from '@angular/animations';
export const animation = trigger('anim', [
    state('in', style({ transform: 'translateX(0)', opacity: 1 })),
    transition('void => *', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(300)
    ]),
    transition('* => void', [
        animate("300ms ease-in-out", style({ transform: 'translateX(-100%)', opacity: 0 }))
    ])
])