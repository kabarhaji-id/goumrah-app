import { event } from "nextjs-google-analytics";

/**
 * Function untuk tracking custom event di Google Analytics
 * @param action - Nama event (contoh: 'click_button')
 * @param category - Kategori event (contoh: 'User Interaction')
 * @param label - Opsional, deskripsi tambahan
 * @param value - Opsional, nilai numerik terkait event
 */
export const trackEvent = ({
                               action,
                               category,
                               label,
                               value,
                           }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    event(action, {
        category,
        label,
        value,
    });
};
