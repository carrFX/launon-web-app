import prisma from '@/prisma';

function haversine(
  latUser: number,
  lonUser: number,
  latOutlet: number,
  lonOutlet: number,
): number {
  const Radius = 6371; // radius rata-rata bumi dalam kilometer. Nilai ini digunakan dalam rumus Haversine untuk mengkonversi jarak sudut menjadi jarak nyata
  const dLat = (latOutlet - latUser) * (Math.PI / 180); // mengubah titik koordinat / derajat menjadi radian
  const dLon = (lonOutlet - lonUser) * (Math.PI / 180);
  const difference =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + // menghitung jarak antara titik koordinat user dan outlet
    Math.cos(latUser * (Math.PI / 180)) *
      Math.cos(latOutlet * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const angularDistance =
    2 * Math.atan2(Math.sqrt(difference), Math.sqrt(1 - difference));

  return Radius * angularDistance; // in KM
}

export async function findNearestOutlet(userAddressId: string) {
  const userAddress = await prisma.address.findFirst({
    where: { id: userAddressId },
  });

  if (!userAddress?.latitude || !userAddress?.longitude) {
    throw new Error('User address does not have latitude and longitude');
  }

  const outletAddresses = await prisma.address.findMany({
    where: { outletId: { not: null } },
  });

  let nearestOutlet = null;
  let minDistance = Infinity;
  for (const outlet of outletAddresses) {
    if (outlet.latitude && outlet.longitude) {
      const distance = haversine(
        userAddress.latitude,
        userAddress.longitude,
        outlet.latitude,
        outlet.longitude,
      );

      // jika jarak lebih kecil dari minDistance, maka outlet ini menjadi outlet terdekat
      if (distance < minDistance) {
        minDistance = distance;
        nearestOutlet = outlet;
      }
    }
  }

  return { nearestOutlet, distance: minDistance };
}
