import { toast } from 'react-toastify';

export function notify(status, message) {
    if (status === 200) {
        toast.success(message)
    } else {
        toast.error(message)
    }
};