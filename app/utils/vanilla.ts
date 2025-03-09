export function createTmpDownloadLink(name: string, content: Blob){
    const url = URL.createObjectURL(content)
    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.download = `${name}.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}