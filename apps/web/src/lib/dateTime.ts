export const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not yet';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(date);
};

export const formatTime = (dateString: string | null) => {
    if (!dateString) return ' - ';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(date);
};