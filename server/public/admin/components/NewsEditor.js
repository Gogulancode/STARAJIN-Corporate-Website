// News Section Editor Component
function createNewsEditor(section, updateCallback) {
    return `
        <div class="space-y-6" x-data="newsEditor(${JSON.stringify(section).replace(/"/g, '&quot;')})">
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

            <!-- Configuration -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Layout</label>
                    <select x-model="config.layout" @change="updateSection()" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                        <option value="cards">Card Layout</option>
                        <option value="list">List Layout</option>
                    </select>
                </div>
                <div>
                    <label class="flex items-center cursor-pointer mt-6">
                        <input type="checkbox" 
                               x-model="config.showDates"
                               @change="updateSection()"
                               class="rounded border-gray-300 text-starajin-blue">
                        <span class="ml-2 text-sm text-gray-700">Show Dates</span>
                    </label>
                </div>
            </div>

            <!-- News Items -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <label class="block text-sm font-medium text-gray-700">News Items</label>
                    <button @click="addNewsItem()" 
                            class="text-starajin-blue hover:text-starajin-blue/80 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add News Item
                    </button>
                </div>

                <div class="space-y-4">
                    <template x-for="(item, itemIndex) in content.items" :key="itemIndex">
                        <div class="border rounded-lg p-4 bg-gray-50">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-medium text-gray-900">News Item #<span x-text="itemIndex + 1"></span></h4>
                                <div class="flex items-center space-x-2">
                                    <!-- Index field -->
                                    <div class="flex items-center space-x-1">
                                        <label class="text-xs text-gray-500">Index:</label>
                                        <input type="number" 
                                               x-model="item.index"
                                               @input="updateSection()"
                                               class="w-16 px-2 py-1 text-xs border border-gray-300 rounded">
                                    </div>
                                    
                                    <button @click="moveItemUp(itemIndex)" :disabled="itemIndex === 0"
                                            class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                                        </svg>
                                    </button>
                                    <button @click="moveItemDown(itemIndex)" :disabled="itemIndex === content.items.length - 1"
                                            class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <button @click="removeItem(itemIndex)" 
                                            class="p-1 text-red-400 hover:text-red-600">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 gap-4">
                                <!-- Title -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input type="text" 
                                           x-model="item.title"
                                           @input="updateSection()"
                                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                </div>

                                <!-- Date -->
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <input type="date" 
                                               x-model="item.date"
                                               @input="updateSection()"
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                                        <input type="url" 
                                               x-model="item.href"
                                               @input="updateSection()"
                                               placeholder="https://..."
                                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                    </div>
                                </div>

                                <!-- Excerpt -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                                    <textarea x-model="item.excerpt"
                                              @input="updateSection()"
                                              rows="2"
                                              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue"></textarea>
                                </div>

                                <!-- Body (optional) -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Full Body (optional)</label>
                                    <textarea x-model="item.body"
                                              @input="updateSection()"
                                              rows="4"
                                              placeholder="Full article content..."
                                              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue"></textarea>
                                </div>

                                <!-- Image Upload -->
                                <div x-data="imageUpload(item.image || {})">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                                    
                                    <div x-show="!image.url" class="border-2 border-dashed border-gray-300 rounded-lg p-4">
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

                                    <div x-show="image.url" class="space-y-2">
                                        <div class="relative">
                                            <img :src="image.url" :alt="image.alt" class="w-full h-32 object-cover rounded border">
                                            <button @click="removeImage()" 
                                                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                                            <input type="text" 
                                                   x-model="image.alt"
                                                   @input="updateItemImage(itemIndex, image)"
                                                   placeholder="Describe the image..."
                                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                        </div>
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

function newsEditor(initialSection) {
    return {
        content: initialSection.content || {
            title: '',
            subtitle: '',
            items: [],
            ctas: []
        },
        config: initialSection.config || {
            layout: 'cards',
            showDates: true
        },

        addNewsItem() {
            this.content.items.push({
                title: '',
                date: new Date().toISOString().split('T')[0],
                excerpt: '',
                body: '',
                href: '',
                image: { url: '', alt: '' },
                index: this.content.items.length
            });
            this.updateSection();
        },

        removeItem(index) {
            this.content.items.splice(index, 1);
            this.updateSection();
        },

        moveItemUp(index) {
            if (index > 0) {
                [this.content.items[index], this.content.items[index - 1]] = 
                [this.content.items[index - 1], this.content.items[index]];
                this.updateSection();
            }
        },

        moveItemDown(index) {
            if (index < this.content.items.length - 1) {
                [this.content.items[index], this.content.items[index + 1]] = 
                [this.content.items[index + 1], this.content.items[index]];
                this.updateSection();
            }
        },

        updateItemImage(itemIndex, imageData) {
            this.content.items[itemIndex].image = imageData;
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

// Image upload helper component
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
        }
    }
}
