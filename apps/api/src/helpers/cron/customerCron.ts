import prisma from '@/prisma';
import cron from 'node-cron';

// Menjalankan cron setiap hari pada pukul 00:00
cron.schedule('0 0 * * *', async () => {
    try {
        const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000); // 2 x 24 jam lalu

        // Update semua order yang belum dikonfirmasi dalam waktu 2x24 jam setelah delivery
        const confirmedOrder = await prisma.order.updateMany({
            where: {
                status: 'on_the_way_to_customer', // Status order saat laundry dikirimkan
                updatedAt: {
                    lte: twoDaysAgo,
                },
            },
            data: {
                status: 'delivered_to_customer',
            },
        });
    } catch (error) {
        console.error('Error auto-confirming orders:', error);
    }
});
