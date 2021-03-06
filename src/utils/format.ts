export function formatDate(value: string) {
    const sdf1 = new Date(value)
    return (sdf1.toLocaleDateString() + ', ' + sdf1.getHours() + ':' + sdf1.getMinutes())
}

export function numberToPrice(value: number) {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}