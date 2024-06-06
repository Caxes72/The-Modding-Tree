addLayer("D", {
    name: "Divine", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#CDD0DC",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Divine points", // Name of prestige currency
    baseResource: "Holy points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('D', 13)) mult = mult.times(upgradeEffect('D', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "D", description: "D: Reset for Divine points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Gotta start somewhere!",
            description: "Double your HP gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Yes!",
            description: "Multiply HP gain by DP",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.9)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "No?!?",
            description: "Multiply DP cost by HP",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(-0.08)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Getting a hang of this?",
            description: "Multiply DP cost by HP",
            cost: new Decimal(7),
            effect() {
                return player.points.add(1).pow(-0.08)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
})
