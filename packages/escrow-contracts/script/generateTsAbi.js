const fs = require('node:fs')

// Simple assumption for now
// const baseSepoliaId = 84532
const baseSepoliaId = 31337

function main() {
  const broadcast = JSON.parse(
    String(fs.readFileSync(`../broadcast/EscrowFactory.s.sol/${baseSepoliaId}/run-latest.json`)),
  )

  const tx = broadcast.transactions[0]
  const escrowFactoryAddress = tx.contractAddress

  const escrowFactoryAbi = JSON.parse(String(fs.readFileSync(`../out/EscrowFactory.sol/EscrowFactory.json`)))
  const simpleEscrowAbi = JSON.parse(String(fs.readFileSync(`../out/SimpleEscrow.sol/SimpleEscrow.json`)))

  const constantsContent = `
    export const escrowFactoryAddress = '${escrowFactoryAddress}'
  `

  const factoryContent = `
    const EscrowFactory = ${JSON.stringify(escrowFactoryAbi, null, 2)} as const;
    export default EscrowFactory
  `

  const escrowContent = `
    const SimpleEscrow = ${JSON.stringify(simpleEscrowAbi, null, 2)} as const;
    export default SimpleEscrow
  `

  fs.writeFileSync('../../contracts-abi/src/SimpleEscrow.ts', escrowContent)
  fs.writeFileSync('../../contracts-abi/src/EscrowFactory.ts', factoryContent)
  fs.writeFileSync('../../contracts-abi/src/constants.ts', constantsContent)
}

main()
