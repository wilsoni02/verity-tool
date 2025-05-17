const MAX_BANK_SIZE = 3;

// === Helper functions ===
function gen1() {
    return (
        "Scenario 1: All Doubled (Everyone is 'Doubled')\n\n" +
        "1. Each player (Left, Middle, Right) kills 1 Knight and picks up the symbol that matches their statue.\n" +
        "2. Deposit symbols:\n" +
        "   - Left → Middle\n" +
        "   - Middle → Right\n" +
        "   - Right → Left\n" +
        "3. Each player kills another Knight and picks up a symbol matching their statue.\n" +
        "4. Deposit symbols:\n" +
        "   - Left → Right\n" +
        "   - Middle → Left\n" +
        "   - Right → Middle\n\n" +
        "Once complete, the Inside phase is done."
    );
}

function gen2(player) {
    const players = ['Left','Middle','Right'];
    const mixed = players.filter(p => p !== player);
    return (
        "Scenario 2: One Doubled and Two Mixed\n\n" +
        `Roles:\n  - Doubled Player: ${player}\n` +
        `  - Mixed #1: ${mixed[0]}\n  - Mixed #2: ${mixed[1]}\n\n` +
        "Steps:\n" +
        `1. ${mixed[0]} → matching → ${mixed[1]}\n` +
        `2. ${mixed[0]} → non-matching → ${player}\n` +
        `3. ${player} → matching → ${mixed[0]}\n` +
        `4. ${player} → matching → ${mixed[1]}\n` +
        `5. ${mixed[1]} → matching → ${mixed[0]}\n` +
        `6. ${mixed[1]} → non-matching → ${player}\n\n` +
        "Inside phase complete."
    );
}

function buildAllMixed(shapes, banks) {
    const players = ['Left','Middle','Right'];
    const lines = [];
    let last = null;
    let step = 1;

    // 0) If exactly one player is already doubled, hand off to Scenario 2
    const doubled = players.filter(p =>
        banks[p].filter(s => s === shapes[p]).length === 2
    );
    if (doubled.length === 1) {
        return gen2(doubled[0]);
    } else if (doubled.length > 1) {
        return `Error: more than one player doubled → ${doubled.join(', ')}`;
    }

    // Track how many symbols each statue has received
    const statueBanks = { Left:0, Middle:0, Right:0 };

    // Header
    lines.push(`Callout (L→M→R): `
        + `${shapes.Left} → ${shapes.Middle} → ${shapes.Right}\n`);

    // ----------------------------------------------------------------
    // Phase 1 – Give out your starting symbols (but never self-deposit)
    // ----------------------------------------------------------------
    lines.push("Phase 1 – Give out your starting symbols:");
    const tasks1 = [];

    // Build only the “non-self” deposits
    players.forEach(p => {
        banks[p].forEach(shape => {
            const target = players.find(s => shapes[s] === shape);
            if (target !== p) {               // ← skip self-deposits
                tasks1.push({ player:p, shape, target });
            }
        });
    });

    // Interleave, obeying both the triumph rule and max-3 capacity
    while (tasks1.length) {
        // find a task that doesn’t hit the same statue twice and won’t overflow
        let idx = tasks1.findIndex(t =>
            t.target !== last
            && statueBanks[t.target] < MAX_BANK_SIZE
        );
        if (idx === -1) {
            // relax the triumph rule if needed, but still respect capacity
            idx = tasks1.findIndex(t =>
                statueBanks[t.target] < MAX_BANK_SIZE
            );
        }
        if (idx === -1) {
            // if everything is at capacity (shouldn’t happen), just pick the first
            idx = 0;
        }

        const { player, shape, target } = tasks1.splice(idx,1)[0];
        statueBanks[target]++;

        lines.push(
            `${step}. ${player} kills a Knight, picks up ${shape}, `
            + `then deposits it on ${target}.`
        );
        last = target;
        step++;
    }

    // ----------------------------------------------------------------
    // Phase 2 – Scenario 1 pattern, rotated and capacity-safe
    // ----------------------------------------------------------------
    lines.push(
        "\nPhase 2 – Distribution (Scenario 1 pattern, rotated to avoid back-to-back):"
    );
    const pattern = [
        ['Left','Middle'], ['Middle','Right'], ['Right','Left'],
        ['Left','Right'],  ['Middle','Left'],  ['Right','Middle']
    ];
    // rotate so first target ≠ last
    const startIdx = pattern.findIndex(([,t]) => t !== last);
    const tasks2 = pattern
        .slice(startIdx).concat(pattern.slice(0,startIdx))
        .map(([p,t]) => ({ player:p, shape:shapes[p], target:t }));

    while (tasks2.length) {
        // choose a valid dunk that obeys both the triumph rule and capacity
        let idx = tasks2.findIndex(t =>
            t.target !== last
            && statueBanks[t.target] < MAX_BANK_SIZE
        );
        if (idx === -1) {
            // if necessary, relax the triumph rule but still cap at 3
            idx = tasks2.findIndex(t =>
                statueBanks[t.target] < MAX_BANK_SIZE
            );
        }
        if (idx === -1) idx = 0;  // last resort

        const { player, shape, target } = tasks2.splice(idx,1)[0];
        statueBanks[target]++;

        lines.push(
            `${step}. ${player} kills a Knight, picks up ${shape}, `
            + `then deposits it on ${target}.`
        );
        last = target;
        step++;
    }

    return lines.join("\n");
}


function makeVariedGeometryText(callout) {
    const shifted = callout[2] + callout[0] + callout[1];
    const nameMap = { C:'Circle', S:'Square', T:'Triangle' };
    const geomMap = {
        C: 'Sphere  (Circle + Circle)',
        S: 'Cube    (Square + Square)',
        T: 'Pyramid (Triangle + Triangle)',
    };

    let text =
        "Varied Geometry 3-Phase Flow  (Normal → Perfect → Normal)\n" +
        "--------------------------------------------------------\n" +
        "• Phase 1 (NORMAL)  –  Run standard Equal-Distribution.  Avoid the \n" +
        "  three *perfect* shapes (Sphere / Cube / Pyramid).\n" +
        "• Phase 2 (PERFECT) –  Follow the right-shift steps below to force \n" +
        "  Sphere, Cube, Pyramid.\n" +
        "• Phase 3 (NORMAL)  –  Return to Equal-Distribution.  Re-use of any\n" +
        "  perfect shape here **fails the triumph**.\n\n";

    text += "INSIDE TEAM — Phase 2 Perfect Rotation\n--------------------------------------------------------\n";
    text += "➊ Consolidate (each player doubles their own base symbol)\n";
    ['Left','Middle','Right'].forEach((pos,i) => {
        text += `  – ${pos}: Kill Knights and deposit any *non-${nameMap[callout[i]]}* until you hold **two ${nameMap[callout[i]]}s**.\n`;
    });
    text +=
        "\n➋ Send ONE of your doubled symbols to *each* teammate (1 each).\n" +
        "   ✅ Call out \"Sent 1\" and **STOP – wait for the Witness wipe.**\n" +
        "   After revive, send the second copy to finish distribution.\n\n" +
        "➌ Final swap into shifted call-out (right-shifted list)\n";
    ['Left','Middle','Right'].forEach((pos,i) => {
        text += `  – ${pos}: Your NEW target shape is ${nameMap[shifted[i]]}.\n`;
        text += `    • Deposit the *other* symbol to delete it from your bank.\n`;
        text += `    • Deposit ${nameMap[shifted[i]]} to receive a second copy → now hold two ${nameMap[shifted[i]]}s.\n`;
    });
    text +=
        "\nExit GLASS wall only if:\n" +
        "   ☑ Holding **exactly two identical symbols** (Sphere/Cube/Pyramid)\n" +
        "   ☑ Neither matches your starting base symbol\n" +
        "   ☑ Shadow wall shows **no remaining shapes**\n\n" +
        "🔹 RNG Note: If any player spawns **already doubled** (or all three do),\n" +
        "   use the alternate quick-swap tables below to avoid bank-overflow\n" +
        "   and \"own-symbol lock\".  Each player must *never* hold more than\n" +
        "   three symbols at once.\n\n" +
        "OUTSIDE TEAM (Dissection)\n--------------------------------------------------------\n" +
        "Target perfect shapes after Phase 2:\n";
    ['Left','Middle','Right'].forEach((pos,i) => {
        text += `  – ${pos}: ${geomMap[shifted[i]]}\n`;
    });
    text +=
        "\nRules:\n" +
        "  1. Convert statues *only* with REMOVE-then-ADD (kill Knight → pick symbol → DISSECT).\n" +
        "  2. End of Phase 1 statues must be Cylinder / Cone / Prism.\n" +
        "  3. End of Phase 2 statues must be Sphere / Cube / Pyramid (above).\n" +
        "  4. **Before Phase 3** start, revert statues back to Cylinder / Cone / Prism.\n";

    return text;
}

// === DOM Logic ===
window.addEventListener('DOMContentLoaded', () => {
    const out = document.getElementById('output');

    // Scenario 1 auto-load
    document.getElementById('scenario1Text').textContent = gen1();

    // Tab switching
    document.querySelectorAll('nav button').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.getElementById(btn.dataset.tab).classList.add('active');
            out.value = '';
        };
    });

    // Scenario 2
    document.getElementById('btn2').onclick = () => {
        out.value = gen2(document.getElementById('doubleSelect').value);
    };

    // Scenario 3
    document.getElementById('btn3').onclick = () => {
        const shapes = {
            Left: document.getElementById('statLeft').value,
            Middle: document.getElementById('statMid').value,
            Right: document.getElementById('statRight').value
        };
        const banks = {
            Left: Array.from(document.querySelectorAll('.bankLeft1, .bankLeft2')).map(e => e.value),
            Middle: Array.from(document.querySelectorAll('.bankMid1, .bankMid2')).map(e => e.value),
            Right: Array.from(document.querySelectorAll('.bankRight1, .bankRight2')).map(e => e.value)
        };
        for (let p of ['Left','Middle','Right']) {
            const [a,b] = banks[p];
            if (a === b) { out.value = `Error: ${p} bank duplicates`; return; }
        }
        const all = banks.Left.concat(banks.Middle, banks.Right);
        if (!['Circle','Square','Triangle'].every(s => all.filter(x => x===s).length===2)) {
            out.value = "Error: total of each shape must equal 2";
            return;
        }
        out.value = buildAllMixed(shapes, banks);
    };

    // Scenario 4
    document.getElementById('btn4').onclick = () => {
        const inp = document.getElementById('vgInput').value.trim().toUpperCase();
        const letters = new Set(inp.split(''));
        if (inp.length!==3 || letters.size!==3 || !['C','S','T'].every(c => letters.has(c))) {
            return alert('Callout must be a permutation of C, S, and T (e.g. CST)');
        }
        out.value = makeVariedGeometryText(inp);
    };

    // Clear
    document.getElementById('clearBtn').onclick = () => {
        out.value = '';
    };
});
