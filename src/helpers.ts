/**
 * Convenience method for automatically converting the label of a form field to an ID. 
 * 
 * @param label Label of a form
 * @returns Label converted to an ID. Spaces are replaced with '-', and all characters are
 *  converted to lower case.
 */
export function labelToId(label: string){
  return label.replace(' ', '-').toLowerCase();
}