import { stringify } from "yaml"

export default function (frontmatterData = {}, content = '', delimitter = '---') {    
    let frontmatter = stringify(frontmatterData).split('\n');
    let fmLength = frontmatter.length;
    [0, fmLength].forEach(indx => frontmatter.splice(indx, 0, delimitter));
    
    return [frontmatter.join('\n'), content].join('\n')
}