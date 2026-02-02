/** Store and manage data - stats.js

 * Purpose:
 * Pure stats calculation from transaction data
 * Easy to scale later
 * Seperate module
 
 */

export function calculateStats(transactions) {
      const total = transactions.length;

      let completedCount = 0;
      let totalVolume = 0;

      transactions.forEach(txn => {
        if (txn.status === "completed"){
          completedCount++;
        }

        const amount = Number(txn.amount);
        if(!isNaN(amount)) {
          totalVolume += amount;
        }
      });

      const successRate = total 
      ? Math.round((completedCount / total) * 100)
      : 0;

      const avgAmount = total 
      ? Math.round(totalVolume / total)
      : 0;

      return {
        total,
        successRate,
        totalVolume,
        avgAmount
      };
}