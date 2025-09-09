// Text Section Editor Component
function createTextEditor(section, updateCallback) {
    return `
        <div class="space-y-6" x-data="textEditor(${JSON.stringify(section).replace(/"/g, '&quot;')})">
            <!-- Heading -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Heading</label>
                <input type="text" 
                       x-model="content.title"
                       @input="updateSection()"
                       placeholder="Section heading..."
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
            </div>

            <!-- Subheading -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Subheading</label>
                <input type="text" 
                       x-model="content.subtitle"
                       @input="updateSection()"
                       placeholder="Section subheading..."
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
            </div>

            <!-- Configuration -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
                    <select x-model="config.alignment" @change="updateSection()" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                        <option value="justify">Justify</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Max Width</label>
                    <select x-model="config.maxWidth" @change="updateSection()" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                        <option value="none">Full Width</option>
                        <option value="sm">Small (640px)</option>
                        <option value="md">Medium (768px)</option>
                        <option value="lg">Large (1024px)</option>
                        <option value="xl">Extra Large (1280px)</option>
                    </select>
                </div>
            </div>

            <!-- Content Blocks -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <label class="block text-sm font-medium text-gray-700">Content Blocks</label>
                    <div class="flex space-x-2">
                        <button @click="addBlock('paragraph')" 
                                class="text-starajin-blue hover:text-starajin-blue/80 text-sm flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
                            </svg>
                            Paragraph
                        </button>
                        <button @click="addBlock('list')" 
                                class="text-starajin-blue hover:text-starajin-blue/80 text-sm flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                            </svg>
                            List
                        </button>
                        <button @click="addBlock('quote')" 
                                class="text-starajin-blue hover:text-starajin-blue/80 text-sm flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </svg>
                            Quote
                        </button>
                    </div>
                </div>

                <div class="space-y-4">
                    <template x-for="(block, blockIndex) in content.blocks" :key="blockIndex">
                        <div class="border rounded-lg p-4 bg-gray-50">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <h4 class="font-medium text-gray-900">
                                        <span x-text="block.type.charAt(0).toUpperCase() + block.type.slice(1)"></span>
                                        #<span x-text="blockIndex + 1"></span>
                                    </h4>
                                    <select x-model="block.type" @change="updateSection()" 
                                            class="text-sm border border-gray-300 rounded px-2 py-1">
                                        <option value="paragraph">Paragraph</option>
                                        <option value="list">List</option>
                                        <option value="quote">Quote</option>
                                    </select>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <button @click="moveBlockUp(blockIndex)" :disabled="blockIndex === 0"
                                            class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                                        </svg>
                                    </button>
                                    <button @click="moveBlockDown(blockIndex)" :disabled="blockIndex === content.blocks.length - 1"
                                            class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <button @click="removeBlock(blockIndex)" 
                                            class="p-1 text-red-400 hover:text-red-600">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Paragraph Content -->
                            <div x-show="block.type === 'paragraph'">
                                <textarea x-model="block.content"
                                          @input="updateSection()"
                                          rows="4"
                                          placeholder="Enter your paragraph content..."
                                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue"></textarea>
                            </div>

                            <!-- List Content -->
                            <div x-show="block.type === 'list'" class="space-y-3">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-3">
                                        <label class="text-sm font-medium text-gray-700">List Items</label>
                                        <select x-model="block.listType" @change="updateSection()" 
                                                class="text-sm border border-gray-300 rounded px-2 py-1">
                                            <option value="unordered">Bullet Points</option>
                                            <option value="ordered">Numbered</option>
                                        </select>
                                    </div>
                                    <button @click="addListItem(blockIndex)" 
                                            class="text-starajin-blue hover:text-starajin-blue/80 text-sm">
                                        + Add Item
                                    </button>
                                </div>
                                <div class="space-y-2">
                                    <template x-for="(item, itemIndex) in block.items || []" :key="itemIndex">
                                        <div class="flex items-center space-x-2">
                                            <input type="text" 
                                                   x-model="item.text"
                                                   @input="updateSection()"
                                                   placeholder="List item text"
                                                   class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                            <button @click="removeListItem(blockIndex, itemIndex)" 
                                                    class="p-2 text-red-400 hover:text-red-600">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <!-- Quote Content -->
                            <div x-show="block.type === 'quote'" class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Quote Text</label>
                                    <textarea x-model="block.quote"
                                              @input="updateSection()"
                                              rows="3"
                                              placeholder="Enter the quote..."
                                              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue"></textarea>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                        <input type="text" 
                                               x-model="block.author"
                                               @input="updateSection()"
                                               placeholder="Quote author"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Source</label>
                                        <input type="text" 
                                               x-model="block.source"
                                               @input="updateSection()"
                                               placeholder="Quote source/context"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <!-- CTAs -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <label class="block text-sm font-medium text-gray-700">Call-to-Action Buttons</label>
                    <button @click="addCTA()" 
                            class="text-starajin-blue hover:text-starajin-blue/80 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add CTA
                    </button>
                </div>

                <div class="space-y-3">
                    <template x-for="(cta, ctaIndex) in content.ctas" :key="ctaIndex">
                        <div class="flex items-center space-x-2">
                            <input type="text" 
                                   x-model="cta.text"
                                   @input="updateSection()"
                                   placeholder="Button text"
                                   class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                            <input type="text" 
                                   x-model="cta.href"
                                   @input="updateSection()"
                                   placeholder="Link URL"
                                   class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                            <select x-model="cta.style" @change="updateSection()" 
                                    class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                            <button @click="removeCTA(ctaIndex)" 
                                    class="p-2 text-red-400 hover:text-red-600">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    `;
}

function textEditor(initialSection) {
    return {
        content: initialSection.content || {
            title: '',
            subtitle: '',
            blocks: [],
            ctas: []
        },
        config: initialSection.config || {
            alignment: 'left',
            maxWidth: 'lg'
        },

        addBlock(type) {
            const newBlock = {
                type: type,
                content: type === 'paragraph' ? '' : null,
                items: type === 'list' ? [] : null,
                listType: type === 'list' ? 'unordered' : null,
                quote: type === 'quote' ? '' : null,
                author: type === 'quote' ? '' : null,
                source: type === 'quote' ? '' : null
            };
            this.content.blocks.push(newBlock);
            this.updateSection();
        },

        removeBlock(index) {
            this.content.blocks.splice(index, 1);
            this.updateSection();
        },

        moveBlockUp(index) {
            if (index > 0) {
                [this.content.blocks[index], this.content.blocks[index - 1]] = 
                [this.content.blocks[index - 1], this.content.blocks[index]];
                this.updateSection();
            }
        },

        moveBlockDown(index) {
            if (index < this.content.blocks.length - 1) {
                [this.content.blocks[index], this.content.blocks[index + 1]] = 
                [this.content.blocks[index + 1], this.content.blocks[index]];
                this.updateSection();
            }
        },

        addListItem(blockIndex) {
            if (!this.content.blocks[blockIndex].items) {
                this.content.blocks[blockIndex].items = [];
            }
            this.content.blocks[blockIndex].items.push({ text: '' });
            this.updateSection();
        },

        removeListItem(blockIndex, itemIndex) {
            this.content.blocks[blockIndex].items.splice(itemIndex, 1);
            this.updateSection();
        },

        addCTA() {
            this.content.ctas.push({
                text: '',
                href: '',
                style: 'primary'
            });
            this.updateSection();
        },

        removeCTA(index) {
            this.content.ctas.splice(index, 1);
            this.updateSection();
        },

        updateSection() {
            // This would trigger a parent component update
            if (window.updateSectionCallback) {
                window.updateSectionCallback(this.content, this.config);
            }
        }
    }
}
