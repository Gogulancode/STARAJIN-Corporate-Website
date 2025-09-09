// Text + Image Section Editor Component
function createTextImageEditor(section, updateCallback) {
    return `
        <div class="space-y-6" x-data="textImageEditor(${JSON.stringify(section).replace(/"/g, '&quot;')})">
            <!-- Heading -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Heading</label>
                <input type="text" 
                       x-model="content.title"
                       @input="updateSection()"
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
            </div>

            <!-- Subheading -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Subheading</label>
                <input type="text" 
                       x-model="content.subtitle"
                       @input="updateSection()"
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
            </div>

            <!-- Layout Configuration -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Image Position</label>
                    <select x-model="config.imagePosition" @change="updateSection()" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Image Size</label>
                    <select x-model="config.imageSize" @change="updateSection()" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                        <option value="small">Small (1/3)</option>
                        <option value="medium">Medium (1/2)</option>
                        <option value="large">Large (2/3)</option>
                    </select>
                </div>
            </div>

            <!-- Content Blocks -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <label class="block text-sm font-medium text-gray-700">Content Blocks</label>
                    <div class="flex space-x-2">
                        <button @click="addBlock('text')" 
                                class="text-starajin-blue hover:text-starajin-blue/80 text-sm flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Add Text Block
                        </button>
                        <button @click="addBlock('list')" 
                                class="text-starajin-blue hover:text-starajin-blue/80 text-sm flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                            </svg>
                            Add List
                        </button>
                    </div>
                </div>

                <div class="space-y-4">
                    <template x-for="(block, blockIndex) in content.blocks" :key="blockIndex">
                        <div class="border rounded-lg p-4 bg-gray-50">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <h4 class="font-medium text-gray-900">
                                        <span x-text="block.type === 'text' ? 'Text Block' : 'List Block'"></span>
                                        #<span x-text="blockIndex + 1"></span>
                                    </h4>
                                    <select x-model="block.type" @change="updateSection()" 
                                            class="text-sm border border-gray-300 rounded px-2 py-1">
                                        <option value="text">Text</option>
                                        <option value="list">List</option>
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

                            <!-- Text Block Content -->
                            <div x-show="block.type === 'text'">
                                <textarea x-model="block.content"
                                          @input="updateSection()"
                                          rows="4"
                                          placeholder="Enter your text content..."
                                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue"></textarea>
                            </div>

                            <!-- List Block Content -->
                            <div x-show="block.type === 'list'" class="space-y-3">
                                <div class="flex items-center justify-between">
                                    <label class="text-sm font-medium text-gray-700">List Items</label>
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
                        </div>
                    </template>
                </div>
            </div>

            <!-- Image Upload -->
            <div x-data="imageUpload(content.image || {})">
                <label class="block text-sm font-medium text-gray-700 mb-2">Section Image</label>
                
                <div x-show="!image.url" class="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div class="text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="mt-2">
                            <button type="button" @click="uploadImage()" 
                                    class="text-starajin-blue hover:text-starajin-blue/80 font-medium">
                                Upload image
                            </button>
                            <input type="file" @change="handleFileSelect($event)" accept="image/*" class="hidden" x-ref="fileInput">
                        </div>
                        <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>

                <div x-show="image.url" class="space-y-3">
                    <div class="relative">
                        <img :src="image.url" :alt="image.alt" class="w-full h-48 object-cover rounded border">
                        <button @click="removeImage()" 
                                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                        <input type="text" 
                               x-model="image.alt"
                               @input="updateImageData()"
                               placeholder="Describe the image..."
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                    </div>
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

function textImageEditor(initialSection) {
    return {
        content: initialSection.content || {
            title: '',
            subtitle: '',
            blocks: [],
            image: { url: '', alt: '' },
            ctas: []
        },
        config: initialSection.config || {
            imagePosition: 'right',
            imageSize: 'medium'
        },

        addBlock(type) {
            const newBlock = {
                type: type,
                content: type === 'text' ? '' : null,
                items: type === 'list' ? [] : null
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

        updateImageData() {
            this.content.image = this.image;
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

// Reusable image upload component
function imageUpload(initialImage) {
    return {
        image: initialImage || { url: '', alt: '' },
        uploading: false,

        uploadImage() {
            this.$refs.fileInput.click();
        },

        async handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;

            this.uploading = true;
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:3004/api/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('cms_token')}`
                    },
                    body: formData
                });

                const result = await response.json();
                
                if (result.success) {
                    this.image = {
                        url: result.url,
                        alt: '',
                        mediaId: result.mediaId
                    };
                    // Update parent component
                    this.$dispatch('image-updated', this.image);
                } else {
                    alert('Upload failed: ' + result.error);
                }
            } catch (error) {
                alert('Upload error: ' + error.message);
            } finally {
                this.uploading = false;
            }
        },

        removeImage() {
            this.image = { url: '', alt: '' };
            this.$dispatch('image-updated', this.image);
        }
    }
}
