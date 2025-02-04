enum SelectionKind {
  Single,
  Multiple,
}

interface QuickPickReturn {
  [SelectionKind.Single]: string;
  [SelectionKind.Multiple]: string[];
}

function showQuickPick<S extends SelectionKind>(
  selectionKind: S,
  items: string[],
): QuickPickReturn[S] {
  if (selectionKind === SelectionKind.Single) {
    // Typescript <=5.7: Type 'string' is not assignable to type 'string[]'.
    // Typescript 5.8 without error
    return items[0];
  } else {
    // Typescript <=5.7: Type 'readonly string[]' is not assignable to type 'string'.
    // Typescript 5.8 without error
    return items;
  }
}

console.log(showQuickPick(SelectionKind.Single, ["foo", "bar"]));
