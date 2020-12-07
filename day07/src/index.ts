import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const rulesInput = input.split('\n');

type RuleSet = Map<string, Map<string, number>>;

const parseBagColourRules = (rules: string): Map<string, number> => {
  const contentsRules = new Map();
  rules.slice(rules.indexOf('contain') + 'contain'.length)
    .split('bags').forEach((rule) => {
      rule.split(/(\d+)/).forEach((r: string, i: number, arr: string[]) => {
        if (!Number.isNaN(parseInt(r, 10))) {
          contentsRules.set(arr[i+1].trim().replace(/bag|,|\./g,'').trim(), parseInt(r, 10));
        }
      });
    })
  return contentsRules;
}

const createRuleSet = (rulesInput: string[]) => {
  const rules: RuleSet = new Map();
  rulesInput.forEach((rule) => {
    const colour = rule.slice(0, rule.indexOf('bags')).trim();
    rules.set(colour, parseBagColourRules(rule));
  });
  return rules;
}

const ruleSet = createRuleSet(rulesInput);

const bagsContainingColour = (colour: string) => {
  const keysContainingColour = new Set();
  ruleSet.forEach((bagContents, key: string) => {
    if (containsColour(bagContents, colour)) keysContainingColour.add(key);
  });
  return keysContainingColour;
}

const containsColour = (bagContents: Map<string, number>, colour: string): boolean => {
  if (bagContents.has(colour)) return true;
  return Array.from(bagContents.keys()).some((key) => containsColour(ruleSet.get(key) || new Map(), colour));
}

console.log(`Part 1 - ${bagsContainingColour('shiny gold').size}`);

const countContainedBags = (colour: string): number => {
  const contents = ruleSet.get(colour);
  if (!contents || contents.size <= 0) {
    return 1;
  }
  return Array.from(contents.entries()).reduce((acc, bag) => acc + bag[1] * (countContainedBags(bag[0])), 1);
}

console.log(`Part 2 - ${countContainedBags('shiny gold') - 1}`)
